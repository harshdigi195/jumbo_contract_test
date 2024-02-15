require("@nomiclabs/hardhat-ethers");
const privatekey = "f198953c847c26ec2a9f69e15c040ffc401ae49e066e0766f10dc8726c61c766";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: { enabled: true, runs: 800 },
          viaIR: true,
        },
      },
      {
        version: "0.8.20",
        settings: {
          optimizer: { enabled: true, runs: 800 },
          evmVersion: "paris",
          viaIR: true,
        },
      },
    ],
  },
  networks: {
    jumbochain: {
      url: `https://internode.jumbochain.org`,
      accounts: [`${privatekey}`]
    }
  }
};





