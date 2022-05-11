// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BobaGetUpEarly is ERC20 {
    enum TimeZone {
        EST,
        PST
    }
    mapping(address => TimeZone) userTimezones;
    address[] usersPlaying;

    constructor() ERC20("GetUpEarly", "GUP") {}

    function enterTimeZone(uint8 timezone) public {
        if (timezone == 0) {
            userTimezones[msg.sender] = TimeZone.EST;
        } else {
            userTimezones[msg.sender] = TimeZone.PST;
        }
        usersPlaying.push(msg.sender);
    }

    function redeemBobaGetUpEarly() public userRegistered {
        // Figure out how to detect whether
        bool userDidWakeUpEarly = true;
        if (userDidWakeUpEarly) {
            _mint(msg.sender, 5);
        } else {
            // Fuck them
            _burn(msg.sender, balanceOf(msg.sender));
        }
    }

    function redeamGUPForBobaMainnet() public userRegistered {
        // 15 GUP = .1 Boba Mainnet
        if (balanceOf(msg.sender) >= 15) {
            _burn(msg.sender, 15);
            payable(msg.sender).transfer(address(this).balance);
        }
    }

    modifier userRegistered() {
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
