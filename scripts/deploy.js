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

//contract address : 0xd0727f1fbA2633207e4c80F3E559d3575F6C6EF4...MUMBAI

main().then(process.exitCode = 0)
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
