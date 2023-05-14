// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract ManufacturerRegistry {
    struct Manufacturer {
        string name;
        string location;
        uint256 registrationDate;
        uint256 balance;
    }

    struct Advertisement {
        uint256 id;
        string productName;
        uint256 area;
        uint256 duration;
        uint256 estimatedRevenue;
        uint256 creationDate;
    }

    mapping(address => Manufacturer) public manufacturers;
    mapping(uint256 => Advertisement) public manufacturerAdvertisements;

    uint256 public advertisementId;

    event ManufacturerRegistered(
        address indexed manufacturerAddress,
        string name,
        string location,
        uint256 registrationDate
    );
    event ManufacturerUpdated(
        address indexed manufacturerAddress,
        string name,
        string location,
        uint256 balance,
        uint256 updatedDate
    );
    event PaymentReceived(address indexed manufacturerAddress, uint256 amount);
    event AdvertisementCreated(
        address indexed manufacturerAddress,
        uint256 advertisementId,
        string productName,
        uint256 area,
        uint256 duration,
        uint256 estimatedRevenue,
        uint256 createdDate
    );
    event AdvertisementRetrieved(
        address indexed manufacturerAddress,
        uint256 advertisementId,
        string productName,
        uint256 area,
        uint256 duration,
        uint256 estimatedRevenue,
        uint256 creationDate
    );

    function registerManufacturer(
        string calldata name,
        string calldata location
    ) external {
        require(bytes(name).length > 0, "Manufacturer name is required");
        require(
            bytes(location).length > 0,
            "Manufacturer location is required"
        );

        manufacturers[msg.sender] = Manufacturer({
            name: name,
            location: location,
            registrationDate: block.timestamp,
            balance: _getBalance()
        });

        emit ManufacturerRegistered(
            msg.sender,
            name,
            location,
            block.timestamp
        );
    }

    function updateManufacturer(
        string calldata name,
        string calldata location
    ) external {
        require(bytes(name).length > 0, "Manufacturer name is required");
        require(
            bytes(location).length > 0,
            "Manufacturer location is required"
        );

        Manufacturer storage manufacturer = manufacturers[msg.sender];
        manufacturer.name = name;
        manufacturer.location = location;

        emit ManufacturerUpdated(
            msg.sender,
            name,
            location,
            manufacturer.balance,
            block.timestamp
        );
    }

    function createAdvertisement(
        string calldata productName,
        uint256 area,
        uint256 estimatedRevenue
    ) external returns (uint256) {
        require(bytes(productName).length > 0, "Product name is required");

        Manufacturer storage manufacturer = manufacturers[msg.sender];
        require(
            manufacturer.balance > 0,
            "Balance should be greater than zero"
        );

        Advertisement storage advertisement = manufacturerAdvertisements[
            advertisementId
        ];
        advertisement.productName = productName;
        advertisement.area = area;
        advertisement.estimatedRevenue = estimatedRevenue;
        advertisement.duration = block.timestamp + 1 minutes;

        emit AdvertisementCreated(
            msg.sender,
            advertisementId,
            productName,
            area,
            advertisement.duration,
            estimatedRevenue,
            block.timestamp
        );

        advertisementId++;
        return advertisementId - 1;
    }

    function retrieveAdvertisementById(
        uint256 _advertisementId
    )
        external
        view
        returns (string memory, uint256, uint256, uint256, uint256)
    {
        require(
            _advertisementId <= advertisementId,
            "Invalid advertisement ID"
        );
        Advertisement storage advertisement = manufacturerAdvertisements[
            _advertisementId
        ];
        return (
            advertisement.productName,
            advertisement.area,
            advertisement.duration,
            advertisement.estimatedRevenue,
            advertisement.creationDate
        );
    }

    function receivePayment() external payable {
        require(msg.value > 0, "Payment amount should be greater than zero");

        manufacturers[msg.sender].balance += msg.value;

        emit PaymentReceived(msg.sender, msg.value);
    }

    function _getBalance() internal view returns (uint256) {
        return msg.sender.balance;
    }

    receive() external payable {}
}
