import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { network } from 'hardhat';
import {DECIMALS, INITIAL_ANSWER, developmentChains, networkConfig} from '../helper-hardhat.config'
const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments,getNamedAccounts}=hre
    const {deploy,log}=deployments
    const {deployer} = await getNamedAccounts()
    console.log("🚀 ~ deployer:", deployer)
   if(developmentChains.includes(network.name)){
    log('local network detected, deploying mocks...')
    await deploy("MockV3Aggregator",{
        contract:"MockV3Aggregator",
        from:deployer,
        log:true, 
        args:[DECIMALS,INITIAL_ANSWER]
    })
    log("Mocks deployed!")
    log("================================")
   }
};
export default func;
func.tags=["all",'mocks']