// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract AdriaTest is ERC20 {

    constructor()
        ERC20("AdriaTest", "ADRIAT") {
            _mint(_msgSender(), 1337 * 10 ** decimals());
        }

}
