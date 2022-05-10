// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract BasicNFT is ERC721Enumerable, Ownable {

    uint256 public id;
    uint256 public limit;

    address public operator;

    string public baseTokenURI;

    event NewBasicNFT(uint256 indexed id);

    modifier onlyOperator() {
        require(
            _msgSender() == operator,
            "Basic NFT: sender must be operator"
        );
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _baseTokenURI,
        uint256 _limit,
        address _operator

    )
        ERC721(_name, _symbol)
    {
        baseTokenURI = _baseTokenURI;
        limit = _limit;
        operator = _operator;
    }

    function operatorMint(address _to, uint256 _count) public onlyOperator {
        _mintMultiple(_to, _count);
    }

    function adminMint(address _to, uint256 _count) public onlyOwner {
        _mintMultiple(_to, _count);
    }

    // Only owner - configuration
    function setOperator(address _operator) public onlyOwner {
        operator = _operator;
    }

    function setLimit(uint256 _limit) public onlyOwner {
        require(_limit >= totalSupply(), "Set Limit: new limit must not be lower than total mint");
        limit = _limit;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // Internal
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function _mintMultiple(address _to, uint256 _count) internal {
        require(id + _count < limit, "Mint: limit reached");

        for (uint256 i = 0; i < _count; i ++) {
            _safeMint(_to, id);
            emit NewBasicNFT(id);
            id ++;
        }
    }

}
