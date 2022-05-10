// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BasicNFT.sol";

import "./TopAuction.sol";


contract CardPackage is Ownable {

    // Trusted contracts
    BasicNFT public immutable npc;
    BasicNFT public immutable item;

    TopAuction public immutable auction;

    mapping(address => bool) public mints;

    uint256 public npcPerMint;
    uint256 public itemPerMint;

    uint256 public id;
    uint256 public limit;

    event NewCardPackage(uint256 indexed id, address winner);

    modifier onlyWinner() {
        require(
            auction.winner(_msgSender()),
            "Card Package: sender must be winner"
        );
        _;
    }

    constructor(
        address _npc,
        address _item,
        address _auction,
        uint256 _npcPerMint,
        uint256 _itemPerMint,
        uint256 _limit
    ) {
        npc = BasicNFT(_npc);
        item = BasicNFT(_item);

        auction = TopAuction(_auction);

        npcPerMint = _npcPerMint;
        itemPerMint = _itemPerMint;

        limit = _limit;
    }

    // Claim mint
    function mint() public onlyWinner {
        address winner = _msgSender();

        require(!mints[winner], "Mint: action already fulfilled");
        require(id < limit, "Mint: limit reached");
        
        mints[winner] = true;

        npc.operatorMint(winner, npcPerMint);
        item.operatorMint(winner, itemPerMint);

        emit NewCardPackage(id, winner);

        id ++;
    }

    // Total mint
    function totalMint() public view returns (uint256) {
        return id;
    }

    // Only owner - configuration
    function setNpcPerMint(uint256 _count) public onlyOwner {
        npcPerMint = _count;
    }

    function setItemPerMint(uint256 _count) public onlyOwner {
        itemPerMint = _count;
    }

    function setLimit(uint256 _limit) public onlyOwner {
        require(_limit >= totalMint(), "Set Limit: new limit must not be lower than total mint");
        limit = _limit;
    }

}
