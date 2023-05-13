const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {
  const growerContract = await ethers.getContractFactory(
    "ManufacturerRegistry"
  );
  const deployedGrowerContract = await growerContract.deploy();

  await deployedGrowerContract.deployed();
  console.log("Grower Contract Address:", deployedGrowerContract.address);

  const investorContract = await ethers.getContractFactory("Investor");
  const deployedInvestorContract = await investorContract.deploy(
    deployedGrowerContract.address
  );
  await deployedInvestorContract.deployed();
  console.log("Investor Contract Address:", deployedInvestorContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
