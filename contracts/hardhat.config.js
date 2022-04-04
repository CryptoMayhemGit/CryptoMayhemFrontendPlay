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
      url: 'http://rpc_chain:8545',
      verify: {
        etherscan: {
          apiUrl: 'http://rpc_scan:4000',
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
