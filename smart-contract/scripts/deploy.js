// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const ProfileImageMinterFactory = await hre.ethers.getContractFactory("ProfileImageNfts");
  const ProfileImageContract = await ProfileImageMinterFactory.deploy();

  await ProfileImageContract.deployed();

  console.log(
    `Profile Image Contract Deployed to: ${ProfileImageContract.address} `
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

;(async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
