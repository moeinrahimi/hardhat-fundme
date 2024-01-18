import 'dotenv/config'
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-solhint";
import "hardhat-deploy";
import '@nomicfoundation/hardhat-ethers';
import 'hardhat-deploy-ethers';
import '@nomicfoundation/hardhat-chai-matchers';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
const config: HardhatUserConfig = {
  solidity: {
    compilers:[
      {version:"0.6.8"},
      {version:"0.8.19"}
    ]
  },
  
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL,
      accounts: [process.env.PRIVATE_KEY as string],
      chainId: 11155111,
      
    },
    localhost: {
      url: 'http://127.0.0.1:8545/',
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
  },
  sourcify: {
    enabled: true,
  },
  namedAccounts:{
    deployer:{
      default:0,
      1: 0,
    }
  }
  
};

export default config;
