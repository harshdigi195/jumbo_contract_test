const {Web3} = require("web3");
require("dotenv").config();
const {ethers} = require("ethers");
const tokencontract = require("/Users/se-home/Desktop/untitled folder/Token.json");
const { tryCatch } = require("fp-ts/lib/Option");
const ABI = tokencontract.abi;
const paymasterContract = require("/Users/se-home/Desktop/untitled folder/artifacts/contracts/src/TokenPaymaster.sol/TokenPaymaster.json")
const Paymaster_ABI = paymasterContract.abi;
// const oraclecontract = require("/Users/se-home/Desktop/Krushna/Hardhat/artifacts/contracts/interfaces/IOracle.sol/IOracle.json")
// const oracle_ABI = oraclecontract.abi;
// const entrypointcontract = require("/Users/se-home/Desktop/Krushna/Hardhat/entry.json")
// const entrypoint_ABI = entrypointcontract.abi;
const privateKey ="f198953c847c26ec2a9f69e15c040ffc401ae49e066e0766f10dc8726c61c766"; // Replace with your actual private key
const API_KEY_URL = "https://internode.jumbochain.org"
const paymaster_contract = "0xa62B06D78FEFf02CCEc442B7bF79C596E6F64637";

const token_Contract="0x351F71778e642B955B3fA1Ebc5501bAd85D7298F"
// const oracle_contract = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
// const entrypoint_Contract="0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

// const oracleAggregatorABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_usdtAddress",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balances",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "internalWallet",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "deposit",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "account",
// 				"type": "address"
// 			}
// 		],
// 		"name": "getTransactionHistory",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "from",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "address",
// 						"name": "to",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "amount",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "timestamp",
// 						"type": "uint256"
// 					}
// 				],
// 				"internalType": "struct myWallet.Transaction[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transactionHistory",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "timestamp",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "externalWallet",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "amount",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "withdraw",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	}
// ]
// const oracleAggregatorContract="0xaC6961f004dA851453236a7D7c1D39aB976E6bFc"

// const price="0x329682145aCcB0ea09be7EFFE2C4EcaBd5b0CDbE"
// const priceAbi=[
//   {
//   "inputs": [
//   {
//   "internalType": "address",
//   "name": "_nativeOracleAddress",
//   "type": "address"
//   },
//   {
//   "internalType": "address",
//   "name": "_tokenOracleAddress",
//   "type": "address"
//   },
//   {
//   "internalType": "string",
//   "name": "_description",
//   "type": "string"
//   }
//   ],
//   "stateMutability": "nonpayable",
//   "type": "constructor"
//   },
//   {
//   "inputs": [],
//   "name": "InvalidPriceFromRound",
//   "type": "error"
//   },
//   {
//   "inputs": [],
//   "name": "LatestRoundIncomplete",
//   "type": "error"
//   },
//   {
//   "inputs": [],
//   "name": "MismatchInBaseAndQuoteDecimals",
//   "type": "error"
//   },
//   {
//   "inputs": [],
//   "name": "OracleAddressCannotBeZero",
//   "type": "error"
//   },
//   {
//   "inputs": [],
//   "name": "PriceFeedStale",
//   "type": "error"
//   },
//   {
//   "inputs": [],
//   "name": "decimals",
//   "outputs": [
//   {
//   "internalType": "uint8",
//   "name": "",
//   "type": "uint8"
//   }
//   ],
//   "stateMutability": "pure",
//   "type": "function"
//   },
//   {
//   "inputs": [],
//   "name": "description",
//   "outputs": [
//   {
//   "internalType": "string",
//   "name": "",
//   "type": "string"
//   }
//   ],
//   "stateMutability": "view",
//   "type": "function"
//   },
//   {
//   "inputs": [],
//   "name": "getThePrice",
//   "outputs": [
//   {
//   "internalType": "int256",
//   "name": "",
//   "type": "int256"
//   }
//   ],
//   "stateMutability": "view",
//   "type": "function"
//   }
//   ]
const provider = new Web3(new Web3.providers.HttpProvider(API_KEY_URL));
// const ethersSigner = ethers.provider.getSigner()

// const wallet = new ethers.Wallet(privateKey, provider);
const web3 = new Web3(provider);


const tokeninstance = new web3.eth.Contract(
  ABI,
  token_Contract
);

const paymentMaster_instance = new web3.eth.Contract(
    Paymaster_ABI,
    paymaster_contract
  );

//   const oracleInstance = new web3.eth.Contract(
//     oracle_ABI,
//     oracle_contract
//   );

//   const entrypointInstance = new web3.eth.Contract(
//     entrypoint_ABI,
//     entrypoint_Contract
//   );

//   const oracleAggregatorInstance = new web3.eth.Contract(
//     oracleAggregatorABI,
//     oracleAggregatorContract
//   );

//   const priceInstance = new web3.eth.Contract(
//     priceAbi,
//     price
//   );

//  const main = async()=>{


//     // await paymaster.updatePrice();
//     // await entryPoint.depositTo(paymaster.address, { value: parseEther('1000') })
//     // await paymaster.addStake(1, { value: parseEther('2') })

//  };

 const main1 = async()=>{
    try{
        const transfer= await tokeninstance.methods.transfer("0xa62B06D78FEFf02CCEc442B7bF79C596E6F64637", 1).encodeABI();
        const nonce = await web3.eth.getTransactionCount("0xB7471EA79Be39307e95232645e82Ef504d1a6Ed7", 'pending');
        const rawTransaction = {
         to: token_Contract,
         gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
         gasLimit: web3.utils.toHex(300000), // Increase gas limit if needed
         data: transfer,
         nonce: web3.utils.toHex(nonce),
       };
    
       // Sign the transaction
       const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
     
       // Send the signed transaction
       const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
       console.log(receipt);
        console.log(transfer);
    }catch(error){
console.log(error);
    }

 }

 const main2 = async()=>{
    try{
        const transfer= await paymentMaster_instance.methods.updateCachedPrice(true).encodeABI();
        const nonce = await web3.eth.getTransactionCount("0xB7471EA79Be39307e95232645e82Ef504d1a6Ed7", 'pending');
        const rawTransaction = {
         to: token_Contract,
         gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
         gasLimit: web3.utils.toHex(300000), // Increase gas limit if needed
         data: transfer,
         nonce: web3.utils.toHex(nonce),
       };
    
       // Sign the transaction
       const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
     
       // Send the signed transaction
       const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
       console.log(receipt);
        console.log(transfer);
    }catch(error){
console.log(error);
    }

 }



//  const paymaster = async()=>{
// //     const transfer= await  paymentMaster_instance.methods.updatePrice().encodeABI();
// //     const nonce = await web3.eth.getTransactionCount("0xCB6ffDCDF074301018CB1e111571F30Ab8ed249c", 'pending');
// //     const rawTransaction = {
// //      to: paymaster_contract,
// //      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
// //      gasLimit: web3.utils.toHex(300000), // Increase gas limit if needed
// //      data: transfer,
// //      nonce: web3.utils.toHex(nonce),
// //    };
// //    // Sign the transaction
// //    const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
 
// //    // Send the signed transaction
// //    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
// //    console.log(receipt);
// //     console.log(transfer);




// const transfer= await  paymentMaster_instance.methods.addStake(1, { value: ethers.parseEther('0.0000000000001') }).encodeABI();
//     const nonce = await web3.eth.getTransactionCount("0xCB6ffDCDF074301018CB1e111571F30Ab8ed249c", 'pending');
//     const rawTransaction = {
//      to: paymaster_contract,
//      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
//      gasLimit: web3.utils.toHex(300000), // Increase gas limit if needed
//      data: transfer,
//      nonce: web3.utils.toHex(nonce),
//    };
//    // Sign the transaction
//    const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
 
//    // Send the signed transaction
//    const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
//    console.log(receipt);
//     console.log(transfer);

//  }


//  const entrypoint = async()=>{
//    // const transfer= await  entrypointInstance.methods.depositTo("0x3cc8ca1FF2F2D197Ee154c07999C0a9a0647879c", { value: ethers.parseEther('0.000000000000001') }).encodeABI();
//     const nonce = await web3.eth.getTransactionCount("0xCB6ffDCDF074301018CB1e111571F30Ab8ed249c", 'pending');
//     console.log(nonce);
//   //   const rawTransaction = {
//   //    to: paymaster_contract,
//   //    gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
//   //    gasLimit: web3.utils.toHex(300000), // Increase gas limit if needed
//   //    data: transfer,
//   //    nonce: web3.utils.toHex(nonce),
//   //  };
//   //  // Sign the transaction
//   //  const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);
 
//   //  // Send the signed transaction
//   //  const receipt = await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
//   //  console.log(receipt);
//   //   console.log(transfer);

//  }

// //  const setoracal = async()=>(
// //   // oracleAggregatorInstance: ChainlinkOracleAggregator,
// //   // tokenAddress: string,
// //   // priceFeedAddress: string,
// //   // priceFeedDecimals: number,
// //   // priceFeedFunctionName: string
// // ) 

// // async function setTokenOracle(
// // ) {
// //   // const PriceFeedContract = await ethers.getContractAt(
// //   //   "FeedInterface",
// //   //   price
// //   // );

// //   // Find the function ABI based on the provided function name
// //   // @ts-ignore
// //   const functionAbi =[
// //     {
// //     "inputs": [
// //     {
// //     "internalType": "address",
// //     "name": "_nativeOracleAddress",
// //     "type": "address"
// //     },
// //     {
// //     "internalType": "address",
// //     "name": "_tokenOracleAddress",
// //     "type": "address"
// //     },
// //     {
// //     "internalType": "string",
// //     "name": "_description",
// //     "type": "string"
// //     }
// //     ],
// //     "stateMutability": "nonpayable",
// //     "type": "constructor"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "InvalidPriceFromRound",
// //     "type": "error"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "LatestRoundIncomplete",
// //     "type": "error"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "MismatchInBaseAndQuoteDecimals",
// //     "type": "error"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "OracleAddressCannotBeZero",
// //     "type": "error"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "PriceFeedStale",
// //     "type": "error"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "decimals",
// //     "outputs": [
// //     {
// //     "internalType": "uint8",
// //     "name": "",
// //     "type": "uint8"
// //     }
// //     ],
// //     "stateMutability": "pure",
// //     "type": "function"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "description",
// //     "outputs": [
// //     {
// //     "internalType": "string",
// //     "name": "",
// //     "type": "string"
// //     }
// //     ],
// //     "stateMutability": "view",
// //     "type": "function"
// //     },
// //     {
// //     "inputs": [],
// //     "name": "getThePrice",
// //     "outputs": [
// //     {
// //     "internalType": "int256",
// //     "name": "",
// //     "type": "int256"
// //     }
// //     ],
// //     "stateMutability": "view",
// //     "type": "function"
// //     }
// //     ]
// //     function encodeFunctionData(functionFragment, values = functionAbi) {
// //       if (typeof functionFragment === "string") {
// //         // Assuming ethers.utils.defaultAbiCoder and ethers.utils.getSighash are defined
// //         functionFragment = ethers.utils.defaultAbiCoder.getFunction(functionFragment);
// //       }
    
// //       return ethers.utils.hexlify(
// //         ethers.utils.concat([
// //           ethers.utils.getSighash(functionFragment),
// //           ethers.utils.defaultAbiCoder.encode(
// //             functionFragment.inputs.map((input) => input.type),
// //             values
// //           ),
// //         ])
// //       );
// //     }

// //   // Generate the function data based on the function ABI
// //   const functionData =
// //   encodeFunctionData(functionAbi);

// //   const tx = await oracleAggregatorInstance.methods.setTokenOracle(
// //     "0xA91156ad445c68cba97Cd167f2f785569965547C",
// //     "0x329682145aCcB0ea09be7EFFE2C4EcaBd5b0CDbE",
// //     18,
// //     functionData,
// //     true
// //   );
// //   const receipt = await tx.wait();
// //   console.log(
// //     `Oracle set for ${tokenAddress} with tx hash ${receipt.transactionHash}`
// //   );
// // }


// async function setTokenOracle() {

//   const functionAbi =[
//     {
//     "inputs": [
//     {
//     "internalType": "address",
//     "name": "_nativeOracleAddress",
//     "type": "address"
//     },
//     {
//     "internalType": "address",
//     "name": "_tokenOracleAddress",
//     "type": "address"
//     },
//     {
//     "internalType": "string",
//     "name": "_description",
//     "type": "string"
//     }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "constructor"
//     },
//     {
//     "inputs": [],
//     "name": "InvalidPriceFromRound",
//     "type": "error"
//     },
//     {
//     "inputs": [],
//     "name": "LatestRoundIncomplete",
//     "type": "error"
//     },
//     {
//     "inputs": [],
//     "name": "MismatchInBaseAndQuoteDecimals",
//     "type": "error"
//     },
//     {
//     "inputs": [],
//     "name": "OracleAddressCannotBeZero",
//     "type": "error"
//     },
//     {
//     "inputs": [],
//     "name": "PriceFeedStale",
//     "type": "error"
//     },
//     {
//     "inputs": [],
//     "name": "decimals",
//     "outputs": [
//     {
//     "internalType": "uint8",
//     "name": "",
//     "type": "uint8"
//     }
//     ],
//     "stateMutability": "pure",
//     "type": "function"
//     },
//     {
//     "inputs": [],
//     "name": "description",
//     "outputs": [
//     {
//     "internalType": "string",
//     "name": "",
//     "type": "string"
//     }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//     },
//     {
//     "inputs": [],
//     "name": "getThePrice",
//     "outputs": [
//     {
//     "internalType": "int256",
//     "name": "",
//     "type": "int256"
//     }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//     }
//     ]

//   //   function encodeFunctionData(functionFragment, values = functionAbi) {
//   //     if (typeof functionFragment === "string") {
//   //         // Assuming ethers.utils.defaultAbiCoder and ethers.utils.solidityKeccak256 are defined
//   //         functionFragment = ethers.utils.defaultAbiCoder.getFunction(functionFragment);
//   //     }
  
//   //     return ethers.utils.hexlify(
    
//   //         ethers.utils.concat([
//   //             ethers.utils.solidityKeccak256(
//   //                 ['string'],
//   //                 [ethers.utils.defaultAbiCoder.encode(
//   //                     ['function'],
//   //                     [ethers.utils.defaultAbiCoder.encode(
//   //                         functionFragment.inputs.map((input) => input.type),
//   //                         values
//   //                     )]
//   //                 )]
//   //             ),
//   //             ethers.utils.defaultAbiCoder.encode(
//   //                 functionFragment.inputs.map((input) => input.type),
//   //                 values
//   //             ),
//   //         ])
//   //     );
//   // }
  
//   // Generate the function data based on the function ABI
//   // const functionData =
//   // encodeFunctionData(functionAbi);
//   const setTokenOracleFunction = oracleAggregatorInstance.methods.setTokenOracle("0xA91156ad445c68cba97Cd167f2f785569965547C", "0x329682145aCcB0ea09be7EFFE2C4EcaBd5b0CDbE", 18, "0x8c3c9a55", true);
//   const encodedABI = functionAbi.encodeABI();

//   const gasPrice = await web3.eth.getGasPrice();
//   const gasLimit = 300000; // You may need to adjust this based on your contract

//   const rawTx = {
//     from: account.address,
//     to: contractAddress,
//     gasPrice: web3.utils.toHex(gasPrice),
//     gasLimit: web3.utils.toHex(gasLimit),
//     data: encodedABI,
//     nonce: await web3.eth.getTransactionCount(account.address),
//   };

//   const tx = new EthereumTx(rawTx); // You may need to adjust the chain
//   tx.sign(Buffer.from(privateKey, 'hex'));

//   const serializedTx = tx.serialize();
//   const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
//   console.log('Token oracle set successfully. Transaction hash:', receipt.transactionHash);
// }


main2()



