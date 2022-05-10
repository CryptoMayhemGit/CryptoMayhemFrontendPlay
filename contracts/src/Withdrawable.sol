// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Withdrawable is Ownable {

    mapping(address => bool) private trustedTokens;

    event Withdrawn(address indexed account, address indexed to, uint256 amount);
    event TokenWithdrawn(address indexed account, address indexed token, address indexed to, uint256 amount);
    event NewTrustedToken(address indexed account, address indexed token);
    event RemovedTrustedToken(address indexed account, address indexed token);

    modifier nonZeroAddress(address _address) {
        require(
            _nonZeroAddress(_address),
            "Withdrawable: address must be non zero"
        );
        _;
    }

    constructor() {}

    function trustedToken(address _token) public view virtual returns (bool) {
        return trustedTokens[_token];
    }

    function addTrustedToken(address _token) public virtual onlyOwner nonZeroAddress(_token) {
        trustedTokens[_token] = true;
        emit NewTrustedToken(_msgSender(), _token);
    }

    function removeTrustedToken(address _token) public virtual onlyOwner nonZeroAddress(_token) {
        delete trustedTokens[_token];
        emit RemovedTrustedToken(_msgSender(), _token);
    }

    function _withdrawToken(address _token, address _to) internal virtual nonZeroAddress(_token) {
        require(trustedToken(_token), "Withdraw Token: untrusted token");
        IERC20 token = IERC20(_token); 
        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.transfer(_to, balance);
            emit TokenWithdrawn(_msgSender(), _token, _to, balance);
        }
    }

    function _withdraw(address _to) internal virtual {
        uint256 balance = address(this).balance;
        if (balance > 0) {
            payable(_to).transfer(balance);
            emit Withdrawn(_msgSender(), _to, balance);
        }
    }

    function _nonZeroAddress(address _address) internal pure returns (bool) {
        return _address != address(0x0);
    }

}
