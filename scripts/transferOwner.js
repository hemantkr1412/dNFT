// const { ConstructionOutlined } = require('@mui/icons-material');
const {ethers} = require('hardhat');
require('dotenv').config();

const contractProps = require("../artifacts/contracts/dNFT.sol/BIT_TOKEN.json");
const PRIVATE_KEY_LOCALHOST = process.env.PRIVATE_KEY_LOCALHOST;
const contractAddress = "0x22b53Ff5eb948022238eE2bd864104C87F9bb19c";
const main = async()=>{
const provider = new ethers.providers.JsonRpcProvider("HTTP://127.0.0.1:7545");
const wallet = new ethers.Wallet(PRIVATE_KEY_LOCALHOST,provider);
const signer = wallet.connect(provider);
const contract = new ethers.Contract(contractAddress,JSON.stringify(contractProps.abi), signer);

try {
    // const name = await contract.name();
    // console.log(name);
    // console.log(JSON.stringify(contractProps.abi))
    const mintNFT = await contract.safeMint("0xAbb38069111cE69e8F3134bA0091eb99b77904c7",
    "https://gateway.pinata.cloud/ipfs/QmRg6VcEryXW6vmk4YudveZpr5rfbZBg3F63KfonmeExZd",
    "NFT minted the first time...",true);
    console.log(mintNFT.hash);
    contract.on("MintLog",(_from,_to,_nftURI,message,isRewarded,event)=>{
console.log(`Sender:${_from},Receiver:${_to},NFTuri:${_nftURI},Message:${message},Reward:${isRewarded}`)
    })

} catch (error) {
    console.log(`error occcured ${error}`);
}


}

main().then(process.exitCode = 0).catch((e)=>{
process.exitCode = 1;
console.log(e);
})