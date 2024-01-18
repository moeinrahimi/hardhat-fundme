import { run } from "hardhat";

export const verify = async (address: string, args: any) => {
  console.log("verifying contract...");
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
    console.log('contract verified successfiully')
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified");
    } else {
      console.log(e);
    }
  }
};
