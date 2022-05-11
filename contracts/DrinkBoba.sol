// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DrinkBoba is ERC20, Ownable {
    struct BobaStruct {
        bool drinkBoba;
    }
    mapping(address => BobaStruct) public userBobaLog;
    address [] public usersPlaying;
    // did you drink boba tea today?
    constructor () ERC20("BobaTea", "BOBATEA") {}

    // reset to false on new day,
    // TODO: rethink design: prob more elegant way to do this
    // probably want to keep history of users

    // called from frontend when user enters Boba Tea
    // probaly setApproval here as well
    function registerUser() external {
        usersPlaying.push(msg.sender);

    }

    function rewardUser() public userRegistered {
        require(userBobaLog[msg.sender].drinkBoba == true);
        _mint(msg.sender, 3);
    }

    // can only be called by owner of contract, issue more bobatea
    function issueMoreBobaTea() public onlyOwner {
        _mint(msg.sender, 1000*10*18);
    }

    modifier userRegistered {
        bool userExists = false;
        for (uint256 i = 0; i < usersPlaying.length; i++) {
            if (usersPlaying[i] == msg.sender) {
                userExists = true;
            }
        }
        require(userExists, "You haven't entered your timezone");
        _;
    }
}