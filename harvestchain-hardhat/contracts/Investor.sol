//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IGrower {
    function retrieveAdvertisementById(
        uint256 _advertisementId
    )
        external
        view
        returns (string memory, uint256, uint256, uint256, uint256, address);
}

contract Investor is ReentrancyGuard {
    IGrower growerContract;

    struct Investors {
        address client;
        uint amount;
        string userName;
    }

    mapping(address => Investors) public investors;

    constructor(address _growerContract) {
        growerContract = IGrower(_growerContract);
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
        investor.amount = amountWithDecimals;
    }

    function sendPayment() public payable nonReentrant {
        Investors storage investor = investors[msg.sender];
        require(
            investor.client == msg.sender,
            "You are not allowed to take any token"
        );
        investor.amount = investor.amount - msg.value;
        (bool ok, ) = msg.sender.call{value: msg.value}("");
        require(ok);
    }

    function sendToGrower(
        uint256 _advertisementId
    ) external payable nonReentrant {
        require(
            msg.sender == investors[msg.sender].client,
            "You are not allowed"
        );
        (, , , , , address growerAddress) = growerContract
            .retrieveAdvertisementById(_advertisementId);
        (bool ok, ) = growerAddress.call{value: msg.value}("");
        require(ok);
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}
