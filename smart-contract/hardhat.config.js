require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/W6zVzJqYI0G2NPToZ_gASZS6uEUr4QpO',
      accounts: ['8b5cd2ea7376af70bd3e5e830c832e005c12e7c5d37ca83e42b467cddb1db4e5']
    }
  }
};
