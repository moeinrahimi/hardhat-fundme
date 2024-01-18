import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { network } from 'hardhat';
import {developmentChains, networkConfig} from '../helper-hardhat.config'
import { verify } from '../utils/verify';
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments,getNamedAccounts}=hre
    const {deploy,log}=deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId
    let ethUsdPriceFeedAddress
    //@ts-ignore
    if(developmentChains.includes(network.name)){
        const ehtUsdAggregator = await deployments.get('MockV3Aggregator')
        ethUsdPriceFeedAddress = ehtUsdAggregator.address
        console.log("🚀 ~ ethUsdPriceFeedAddress:", ethUsdPriceFeedAddress)
    }else{
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]

    }
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe",{
        from:deployer,
        args:args,
        log:true,
        waitConfirmations:0
    })
    log("==================================")
    if(!developmentChains.includes(network.name)){
        // verify to etherscan
        await verify(fundMe.address,args)
    }
    
};
export default func;
func.tags = ["all","fundme"]