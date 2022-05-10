// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "./Withdrawable.sol";


contract TopAuction is Ownable, Pausable, Withdrawable {

    enum Status {
        Waiting,
        Live,
        Closed,
        Finalized,
        Terminated
    }

    struct Offer {
        address from;
        uint256 price;
        uint256 nonce;
    }

    // Trusted 
    IERC20 public immutable token;

    address public immutable treasury;

    // Configuration
    uint256 public minPrice;
    uint256 public minPriceIncrement;

    uint256 public openTimestamp;
    uint256 public closeTimestamp;

    // Auction logic
    Status public status;
    
    Offer[] public offers;

    mapping(address => bool) public refunds;
    mapping(address => bool) public participants;
    mapping(address => uint256) public offersIndex;

    uint256 public nonce;

    uint256 public acceptedPrice;
    uint256 public acceptedNonce;

    event NewOffer(address indexed from, uint256 price, uint256 nonce);
    event UpdatedOffer(address indexed from, uint256 price, uint256 nonce);
    event Refunded(address indexed participant, uint256 amount);
    event StatusChanged(Status status);

    modifier whenWaiting() {
        require(
            _waiting(),
            "Status: auction must be waiting"
        );
        _;
    }

    modifier whenLive() {
        require(
            _live(),
            "Status: auction must be live"
        );
        _;
    }

    modifier whenClosed() {
        require(
            _closed(),
            "Status: auction must be closed"
        );
        _;
    }

    modifier whenFinalized() {
        require(
            _finalized(),
            "Status: auction must be finalized"
        );
        _;
    }

    modifier whenTerminated() {
        require(
            _terminated(),
            "Status: auction must be terminated"
        );
        _;
    }

    modifier whenNotFinalized() {
        require(
            !_finalized(),
            "Status: auction must not be finalized"
        );
        _;
    }

    modifier beforeClosed() {
        require(
            _waiting() || _live(),
            "Status: auction must be waiting or live"
        );
        _;
    }

    modifier onlyParticipant() {
        require(
            _participant(_msgSender()),
            "Auction: sender must be participant"
        );
        _;
    }
    
    constructor(
        address _token,
        address _treasury,
        uint256 _minPrice,
        uint256 _minPriceIncrement,
        uint256 _openTimestamp,
        uint256 _closeTimestamp
    ) {
        require(_nonZeroAddress(_token), "Constructor: token must be non zero address");
        require(_nonZeroAddress(_treasury), "Constructor: treasury must be non zero address");
        require(_after(_closeTimestamp), "Constructor: auction should not be closed at creation");
        
        token = IERC20(_token);
        treasury = _treasury;

        minPrice = _minPrice;
        minPriceIncrement = _minPriceIncrement;

        openTimestamp = _openTimestamp;
        closeTimestamp = _closeTimestamp;

        status = Status.Waiting;
    }

    // Place bid
    function bid(uint256 _amount) public whenNotPaused whenLive {
        address bidder = _msgSender();

        token.transferFrom(bidder, address(this), _amount);

        if (_participant(bidder)) {

            require(_amount >= minPriceIncrement, "Update Offer: price increment below lower limit");

            Offer storage offer = _offer(bidder);
            offer.price += _amount;
            offer.nonce = nonce;

            emit UpdatedOffer(bidder, offer.price, nonce);

        } else {

            require(_amount >= minPrice, "New Offer: price below lower limit");

            participants[bidder] = true;
            offersIndex[bidder] = offers.length;

            offers.push(
                Offer(bidder, _amount, nonce)
            );

            emit NewOffer(bidder, _amount, nonce);
        }

        nonce ++;
    }

    // Refund for non winners
    function refund() public whenNotPaused whenFinalized onlyParticipant {
        address participant = _msgSender();
        
        require(!_winner(participant), "Refund: participant must be non winnner");

        _refund(participant);
    }

    // Refund for all
    function recover() public whenNotPaused whenTerminated onlyParticipant {
        _refund(_msgSender());
    }

    // Winner check
    function winner(address _address) public view returns (bool) {
        if (!_finalized() || !_participant(_address)) return false;
        return _winner(_address);
    }

    // Only owner - control
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function open() public onlyOwner whenWaiting {
        _changeStatus(Status.Live);
    }

    function close() public onlyOwner whenLive {
        _changeStatus(Status.Closed);
    }

    function finalize(uint256 _price, uint256 _nonce, uint256 _pool) public onlyOwner whenClosed {
        _changeStatus(Status.Finalized);
        token.transfer(treasury, _pool);
        acceptedPrice = _price;
        acceptedNonce = _nonce;
    }

    function terminate() public onlyOwner whenNotFinalized {
        _changeStatus(Status.Terminated);
    }

    // Only owner - configuration
    function setOpenTimestamp(uint256 _timestamp) public onlyOwner whenWaiting {
        openTimestamp = _timestamp;
    }

    function setCloseTimestamp(uint256 _timestamp) public onlyOwner beforeClosed {
        closeTimestamp = _timestamp;
    }

    function setMinPrice(uint256 _price) public onlyOwner {
        minPrice = _price;
    }

    function setMinPriceIncrement(uint256 _price) public onlyOwner {
        minPriceIncrement = _price;
    }

    // Only owner - finance
    function withdraw() public onlyOwner {
        _withdraw(treasury);
    }

    function withdrawToken(address _token) public onlyOwner {
        _withdrawToken(_token, treasury);
    }

    // Internal
    function _waiting() internal view returns (bool) {
        return _equalStatus(Status.Waiting);
    }

    function _live() internal view returns (bool) {
        return _equalStatus(Status.Live) || _after(openTimestamp);
    }

    function _closed() internal view returns (bool) {
        return _equalStatus(Status.Closed) || _after(closeTimestamp);
    }

    function _finalized() internal view returns (bool) {
        return _equalStatus(Status.Finalized);
    }

    function _terminated() internal view returns (bool) {
        return _equalStatus(Status.Terminated);
    }

    function _equalStatus(Status _status) internal view returns (bool) {
        return _status == status;
    }

    function _after(uint256 _timestamp) internal view returns (bool) {
        return _timestamp >= block.timestamp;
    }

    function _participant(address _address) internal view returns (bool) {
        return participants[_address];
    }

    function _winner(address _address) internal view returns (bool) {
        Offer memory offer = _offer(_address);
        return offer.price > acceptedPrice || (offer.price == acceptedPrice && offer.nonce <= acceptedNonce);
    }

    function _offer(address _address) internal view returns (Offer storage) {
        return offers[offersIndex[_address]];
    }

    function _changeStatus(Status _status) internal {
        status = _status;
        emit StatusChanged(_status);
    }

    function _refund(address _address) internal {
        require(!refunds[_address], "Refund: action already fulfilled");

        refunds[_address] = true;

        Offer memory offer = _offer(_address);

        token.transfer(_address, offer.price);

        emit Refunded(_address, offer.price);
    }

}
