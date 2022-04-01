require('dotenv')
  .config(
    { override: true }
  )

require('@nomiclabs/hardhat-waffle')

require('hardhat-deploy')


module.exports = {
  solidity: {
    version: '0.8.9',
    setting: {
      optimizer: {
        enabled: true,
        runs: 999999
      }
    }
  },
  networks: {
    localhost: {
      url: 'http://localhost:8545'
    },
    stage: {
      url: 'http://127.0.0.1:8545',
      verify: {
        etherscan: {
          apiUrl: 'http://127.0.0.1:4000',
          apiKey: 'undefined'
        }
      }
    }
  },
  namedAccounts: {
    deployer: 0
  },
  paths: {
    sources: './src'
  }
}
