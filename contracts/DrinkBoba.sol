// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DrinkBoba is ERC20, Ownable {
    // just keep this user speci
    mapping(address => uint256) public userBobaLog;
    // keep track of if user has locked for 30 days
    mapping(address => uint256) public lockTime;
    address [] public usersPlaying;
    uint256 public constant BOBA_PAYOUT = 10e16;
    uint256 public constant BTEA_REDEMPTION_AMOUNT = 5 * 10e18;
    uint256 public constant CONTRACT_APPROVAL_AMOUNT = 10000 * 10e18;
    uint256 private duration = 30 days;
    constructor () ERC20("BobaTea", "BOBATEA") {}

    function registerUser() public payable {
        // removing as will not make this a competition, at least for now
        // require(msg.value == .000001 ether, "You must pay .000001 ether to register!");
        approve(address(this), CONTRACT_APPROVAL_AMOUNT);
        usersPlaying.push(msg.sender);
    }

    function incrementBobaCount() public userRegistered {
        // TODO: add validation that user can only call once a day (maybe on frontend?)
        userBobaLog[msg.sender] += 1;
        _mint(msg.sender, BTEA_REDEMPTION_AMOUNT);
    }

    function getUserBobaCount() public view userRegistered returns (uint256)  {
        return userBobaLog[msg.sender];
    }

    // // TODO: Add logic for when wewant to call this (once a week/month?)
    // function declareWinner() public onlyOwner {
    //     address winner = calculateWinner();
    //     _mint(winner, BTEA_REDEMPTION_AMOUNT);
    // }

    // TODO: rethink pattern here, should there be a param or frontend validates msg.value
    function redeemBobaTeaForBobaMainnet() public payable userRegistered {
        // 15 GUP = .1 Boba Mainnet
        if (balanceOf(msg.sender) >= BTEA_REDEMPTION_AMOUNT) {
            _burn(msg.sender, BTEA_REDEMPTION_AMOUNT);
            payable(msg.sender).transfer(BOBA_PAYOUT);
        }
    }

    // calculate winner logic is harder, have to ensure every user enters pool
    // before certain date, pool starts at same time, ends at same time, etc
    // since this is proof of concept let's get rid of all of this and just
    // allow user to redeem boba whenever. but need to have restrictions on how
    // often they can increment boba amount
    // return user with highest Boba Count
    // function calculateWinner() public view returns (address) {
    //     // TODO: handle edge cases (multiple winners?)
    //     uint256 highest = 0;
    //     address winner;
    //     for (uint256 i = 0; i < usersPlaying.length; i++) {
    //         if(userBobaLog[usersPlaying[i]] > highest) {
    //             highest = userBobaLog[usersPlaying[i]];
    //             winner = usersPlaying[i];
    //         }
    //     }
    //     require(highest != 0, "No one drank boba tea! No one wins :(");
    //     return winner;
    // }

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
    receive() external payable {}
}