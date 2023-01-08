const {ethers} = require("hardhat");

async function main() {
  const contract = await ethers.getContractFactory("BIT_TOKEN");
  console.log("Contract is deploying....");
  const contractDep = await contract.deploy();
  await contractDep.deployed();
  const contractAddress =  contractDep.address;
  console.log(`Contract address is: ${contractAddress}`);
  // console.log(`Txn Hash is ${contractDep.hash});
}

//contract address : 0x43dfA7e4F98134b0720cA158f5f4bC00732D4d6c...MUMBAI

main().then(process.exitCode = 0)
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
