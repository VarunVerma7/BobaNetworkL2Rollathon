// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DrinkBoba is ERC20, Ownable {
    mapping(address => uint256) public userBobaLog;
    address [] public usersPlaying;
    uint256 public constant BOBA_PAYOUT = 10e16;
    uint256 public constant BTEA_REDEMPTION_AMOUNT = 5 * 10e18;
    uint256 public constant CONTRACT_APPROVAL_AMOUNT = 10000 * 10e18;
    constructor () ERC20("BobaTea", "BOBATEA") {}

    function incrementBobaCount(bool drinkBoba) public {
        // TODO: add validation that user can only call once a day (maybe on frontend?)
        bool userExists = false;

        if(!drinkBoba) return;
        for (uint256 i = 0; i < usersPlaying.length; i++) {
            if(usersPlaying[i] == msg.sender) {
                userExists = true;
            }
        }

        if(userExists) {
            userBobaLog[msg.sender] += 1;
            _mint(msg.sender, 1 *10e18);
        } else {
            approve(address(this), CONTRACT_APPROVAL_AMOUNT);
            usersPlaying.push(msg.sender);
            userBobaLog[msg.sender] += 1;
            _mint(msg.sender, 1 *10e18);
        }
    }

    function getUserBobaCount() public view userRegistered returns (uint256)  {
        return userBobaLog[msg.sender];
    }
    function redeemBobaTeaForBobaMainnet(uint256 amount) public payable userRegistered {
        require(amount >= BTEA_REDEMPTION_AMOUNT, "You need to redeem your BOBATEA tokens");
        uint256 allowance = allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        _burn(msg.sender, BTEA_REDEMPTION_AMOUNT);
        payable(msg.sender).transfer(BOBA_PAYOUT);
    }

    modifier userRegistered {
        bool userExists = false;
        for (uint256 i = 0; i < usersPlaying.length; i++) {
            if (usersPlaying[i] == msg.sender) {
                userExists = true;
            }
        }
        require(userExists, "You haven't entered your Boba Tea consumption before!");
        _;
    }

    // can only be called by owner of contract, issue more bobatea
    function issueMoreBobaTea() public onlyOwner {
        _mint(msg.sender, 1000*10e18);
    }
    receive() external payable {}
}