const { ethers, upgrades } = require("hardhat");
const { BigNumber } = require('ethers');
const main= async () =>{


  const [deployer] = await ethers.getSigners();


  try {

    await deployer.sendTransaction({
        to: deployer.address,
        value: ethers.utils.parseEther("1.0"), // Adjust the amount as needed
      });
    const TokenPaymasterConfigArr =[
        "1500000000000000000000000000",
        "100000000000000000",
        "40000",
        "86400"
    ]
    const OracleHelperConfigArr =[
        "0xCbdc5fE29501583E59365b79D9ccfeaA74045265",
        "0x87a35da5dc08208d14818324a2Ef32fDc2f78fB7",
         false,
         false,
        false,
        "200000",
         "0"
    ]
   const UniswapHelperConfigArr =["1","2","3"]

   

        const IERC20Metadata ="0x351F71778e642B955B3fA1Ebc5501bAd85D7298F"
        const IEntryPoint ="0xDAE0a2d4F7376e8B331c72363B50DaFB0297c7E3"
        const IERC20_wrappedNative ="0xc360e8Ed61D443F0f8f20A03f1CFD1EE9466d58E"
        const ISwapRouter ="0x022f7Bd221C1153B0F69165259092a8D0dFE11d8"
        const TokenPaymasterConfig  =TokenPaymasterConfigArr
        const OracleHelperConfig  =OracleHelperConfigArr
        const UniswapHelperConfig  =UniswapHelperConfigArr
        const address ="0xB7471EA79Be39307e95232645e82Ef504d1a6Ed7"
  
    const TokenPaymaster = await ethers.getContractFactory("TokenPaymaster");
    // console.log(TokenPaymaster);
    const paymaster = await TokenPaymaster.deploy(
         IERC20Metadata ,
         IEntryPoint ,
         IERC20_wrappedNative ,
         ISwapRouter ,
         TokenPaymasterConfig,
         OracleHelperConfig  ,
         UniswapHelperConfig ,
         address ,
         {
            gasLimit: 500000, // Adjust the gas limit as needed
          }
    );
  
  //   await paymaster.deployed();
  
    console.log("jumboERC20Paymaster deployed to:", paymaster.address);
    console.log("transaction hash:", paymaster.deployTransaction.hash);
} catch (error) {
    console.log(error);
}



}
// setInterval(main, 5000);
main() .then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
;
