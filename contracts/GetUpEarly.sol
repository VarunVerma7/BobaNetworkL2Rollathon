// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BobaGetUpEarly is ERC20 {
    // Dates will stored: dd/month/year
    enum TimeZone {
        EST,
        PST
    }
    mapping(address => TimeZone) userTimezones;
    address[] usersPlaying;
    mapping(address => mapping(string => bool)) userLogs;

    constructor() ERC20("GetUpEarly", "GUP") {}

    function enterTimeZone(uint8 timezone) public {
        if (timezone == 0) {
            userTimezones[msg.sender] = TimeZone.EST;
        } else {
            userTimezones[msg.sender] = TimeZone.PST;
        }
        // Contract can spend their ERC20s
        approve(address(this), 100000000);
        usersPlaying.push(msg.sender);
    }

    function redeemBobaGetUpEarly(bool wakeUpEarly, string memory currentDate)
        public
        userRegistered
    {
        userLogs[msg.sender][currentDate] = wakeUpEarly;
        if (wakeUpEarly) {
            _mint(msg.sender, 5 * 10e18);
        } else {
            // Fuck them
            _burn(msg.sender, balanceOf(msg.sender));
        }
    }

    function mintTokens() public {
        _mint(msg.sender, 100 * 10e18);
    }

    function redeamGUPForBobaMainnet() public payable userRegistered {
        // 15 GUP = .1 Boba Mainnet
        if (balanceOf(msg.sender) >= 5 * 10e18) {
            _burn(msg.sender, 5 * 10e18);
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

    function giveRinkebyBack() public payable {
        payable(address(this)).transfer(address(this).balance);
    }

    receive() external payable {}
}
