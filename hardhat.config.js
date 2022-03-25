require("@nomiclabs/hardhat-waffle");
const fs = require('fs')
const projectId = '2f9066f303b84d3faee2dab3b1e1ce5b'
const keyData = fs.readFileSync('./p-key.txt', {
  encoding: 'utf8',
  flag: 'r'
})

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
    },
    mumbai:{
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts:[keyData]
    },
    mainnet:{
      url: `https://mainnet.infura.io/v3/${projectId}`,
      accounts:[keyData]
    }
  },
  solidity: {
    version: "0.8.5",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
};
