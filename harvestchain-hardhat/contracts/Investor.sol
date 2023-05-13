//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Investor is ReentrancyGuard {
    address public immutable growerContract;

    struct Investors {
        address client;
        uint amount;
        string userName;
    }

    mapping(address => Investors) public investors;

    constructor(address _growerContract) {
        growerContract = _growerContract;
    }

    function getUserName(string memory _userName) public {
        //get user name from investor
        require(
            bytes(investors[msg.sender].userName).length == 0,
            "User already registered"
        );
        Investors storage investor = investors[msg.sender];
        investor.userName = _userName;
        investor.client = msg.sender;
    }

    function takePayment(uint256 _amount) public payable {
        //get payment from investor
        Investors storage investor = investors[msg.sender];
        uint256 amountWithDecimals = _amount * 10 ** 18;
        require(amountWithDecimals == msg.value, "Wrong amount");
        investor.amount += amountWithDecimals;
    }

    function sendPayment(uint256 _amount) public payable {
        Investors storage investor = investors[msg.sender];
        require(
            investor.client == msg.sender,
            "You are not allowed to take any token"
        );
        uint256 amountWithDecimals = _amount * 10 ** 18;
        require(amountWithDecimals == msg.value, "Wrong amount");
        investor.amount = 0;
        (bool ok, ) = msg.sender.call{value: amountWithDecimals}("");
        require(ok);
    }

    function sendToGrower(uint256 amount) external payable nonReentrant {
        require(
            msg.sender == investors[msg.sender].client,
            "You are not allowed"
        );
        amount = msg.value;
        (bool ok, ) = growerContract.call{value: amount}("");
        require(ok);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
