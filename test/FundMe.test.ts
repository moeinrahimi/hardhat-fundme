import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { deployments, ethers, getNamedAccounts } from "hardhat";
import { assert } from "chai";
import { FundMe, MockV3Aggregator } from "../typechain-types";

describe("FundMe", function () {
  let fundMe: FundMe;
  let deployer;
  let mockV3Aggregator: MockV3Aggregator;
  let sendValue = ethers.parseEther("1")
  beforeEach(async function () {
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    fundMe = await ethers.getContract("FundMe", deployer);
    
    mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer);
  });

  describe("constructor", async function () {
    it("sets the aggregator addressess correctlry", async function () {
      const response = await fundMe.priceFeed();
      console.log("🚀 ~ response:", response)
      assert.equal(response, await mockV3Aggregator.getAddress());
    });
  });

  describe("fund method", async function () {
    it("fails if you don't send enough ETH", async function () {
      await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!");
      
    });
  //   it("updated the amount of funded data structure", async function () {
  //     await fundMe.fund({value:sendValue})
  //     const response = await fundMe.addressToAmountFunded(deployer)
  //     assert.equal(response.toString(),sendValue.toString())
      
  //   });
    it("adds funder to array of funders", async function () {
      await fundMe.fund({value:sendValue})
      const funder = await fundMe.funders(0)
      assert.equal(funder,deployer)
      
    });
  // });
  // describe('withdraw',async function(){
  //   beforeEach(async function(){
  //     console.log("🚀 ~ beforeEach ~ sendValue:", sendValue)
  //     await fundMe.fund({value:sendValue})
  //   })
    // it("withdraw ETH from a single founder", async function () {
    //   const startingFundMeBalance =await ethers.provider.getBalance(await fundMe.getAddress())
    //   const startingDeployerBalance =await ethers.provider.getBalance(deployer)
    //   const transactionResponse = await fundMe.withdraw()
    //   const transactionReceipt = await transactionResponse.wait(1)

    //   const endingFundMeBalance =await ethers.provider.getBalance(await fundMe.getAddress())
    //   const endingDeployerBalance =await ethers.provider.getBalance(deployer)

    //   assert.equal(endingFundMeBalance,BigInt(0))
    //   //@ts-ignore
    //   assert.equal(startingFundMeBalance.add(startingDeployerBalance),endingDeployerBalance)
      
    // });
  })
});
