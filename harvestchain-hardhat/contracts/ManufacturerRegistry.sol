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
    mapping(address => Advertisement[]) public manufacturerAdvertisements;

    uint256 private advertisementId = 1;

    event ManufacturerRegistered(address indexed manufacturerAddress, string name, string location, uint256 registrationDate);
    event ManufacturerUpdated(address indexed manufacturerAddress, string name, string location, uint256 balance, uint256 updatedDate);
    event PaymentReceived(address indexed manufacturerAddress, uint256 amount);
    event AdvertisementCreated(address indexed manufacturerAddress, uint256 advertisementId, string productName, uint256 area, uint256 duration, uint256 estimatedRevenue, uint256 createdDate);
    event AdvertisementRetrieved(address indexed manufacturerAddress, uint256 advertisementId, string productName, uint256 area, uint256 duration, uint256 estimatedRevenue, uint256 creationDate);
    event AdvertisementDeleted(address indexed manufacturerAddress, uint256 advertisementId);

    function registerManufacturer(string calldata name, string calldata location) external {
        require(bytes(name).length > 0, "Manufacturer name is required");
        require(bytes(location).length > 0, "Manufacturer location is required");

        manufacturers[msg.sender] = Manufacturer({
            name: name,
            location: location,
            registrationDate: block.timestamp,
            balance: _getBalance()
        });

        emit ManufacturerRegistered(msg.sender, name, location, block.timestamp);
    }

    function updateManufacturer(string calldata name, string calldata location) external {
        require(bytes(name).length > 0, "Manufacturer name is required");
        require(bytes(location).length > 0, "Manufacturer location is required");

        Manufacturer storage manufacturer = manufacturers[msg.sender];
        manufacturer.name = name;
        manufacturer.location = location;

        emit ManufacturerUpdated(msg.sender, name, location, manufacturer.balance, block.timestamp);
    }

    function createAdvertisement(string calldata productName, uint256 area, uint256 duration, uint256 estimatedRevenue) external {
        require(bytes(productName).length > 0, "Product name is required");

        Manufacturer storage manufacturer = manufacturers[msg.sender];
        require(manufacturer.balance > 0, "Balance should be greater than zero");

        Advertisement memory advertisement = Advertisement({
            id: advertisementId,
            productName: productName,
            area: area,
            duration: duration,
            estimatedRevenue: estimatedRevenue,
            creationDate: block.timestamp
        });

        manufacturerAdvertisements[msg.sender].push(advertisement);

        emit AdvertisementCreated(msg.sender, advertisementId, productName, area, duration, estimatedRevenue, block.timestamp);

        advertisementId++;
    }

    function retrieveAdvertisementById(uint256 _advertisementId) external view returns (string memory productName, uint256 area, uint256 duration, uint256 estimatedRevenue, uint256 creationDate) {
        Advertisement[] storage advertisements = manufacturerAdvertisements[msg.sender];
        require(_advertisementId > 0 && _advertisementId <= advertisements.length, "Invalid advertisement ID");

        Advertisement storage advertisement = advertisements[advertisementId - 1];
        return (advertisement.productName, advertisement.area, advertisement.duration, advertisement.estimatedRevenue, advertisement.creationDate);
    }

    function deleteAdvertisement(uint256 _advertisementId) external {
        Advertisement[] storage advertisements = manufacturerAdvertisements[msg.sender];
        require(_advertisementId > 0 && _advertisementId <= advertisements.length, "Invalid advertisement ID");

        delete advertisements[_advertisementId - 1];

        emit AdvertisementDeleted(msg.sender, _advertisementId);
    }

    function receivePayment() external payable {
        require(msg.value > 0, "Payment amount should be greater than zero");

        manufacturers[msg.sender].balance += msg.value;

        emit PaymentReceived(msg.sender, msg.value);
    }

    function _getBalance() internal view returns (uint256) {
        return msg.sender.balance;
    }
}