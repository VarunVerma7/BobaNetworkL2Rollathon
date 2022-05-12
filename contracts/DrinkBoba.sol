// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DrinkBoba is ERC20, Ownable {
    mapping(address => uint256) public userBobaLog;
    address [] public usersPlaying;
    // did you drink boba tea today?
    constructor () ERC20("BobaTea", "BOBATEA") {}

    // if user not signed up, append to usersPlaying and increment boba tea count
    function incrementBobaCount() public {
        for (uint256 i = 0; i < usersPlaying.length; i++) {
            if (usersPlaying[i] == msg.sender) {
                userBobaLog[msg.sender] += 1;
                return;
            }
        }
        usersPlaying.push(msg.sender);
        userBobaLog[msg.sender] += 1;
    }

    function getUserBobaCount() public view userRegistered returns (uint256)  {
        return userBobaLog[msg.sender];
    }

    // return user with highest Boba Count
    function calculateWinner() public view returns (address) {
        uint256 highest = 0;
        address winner;
        for (uint256 i = 0; i < usersPlaying.length; i++) {
            if(userBobaLog[usersPlaying[i]] > highest) {
                highest = userBobaLog[usersPlaying[i]];
                winner = usersPlaying[i];
            }
        }
        return winner;
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
        _mint(msg.sender, 1000*10*18);
    }
}