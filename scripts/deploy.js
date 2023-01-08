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

//contract address : 0x1e19Fc0BF95a0CFa438e6A44eb1E3B232F6EFcfD...MUMBAI

main().then(process.exitCode = 0)
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
