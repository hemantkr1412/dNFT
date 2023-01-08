import {React,useState} from 'react';
import {ethers} from 'ethers';
import {contractAddress, abi} from './common.js';

function ViewNFT(){

    const [tokenId,setTokenId] = useState("");
    const [walletAddress,setWalletAddress] = useState("");
    const viewNFT = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
        //API CALL...FETCH NFT...


        
       const tokenOwnerAddress = await contract.ownerOf(tokenId);
    //    console.warn(ownerAddress);
       setWalletAddress(tokenOwnerAddress);
    //    console.warn("Wallet has changed...")
    //    const tokenInfo = await contract.addressToUser(walletAddress);
    //    console.warn(tokenInfo);
       //Here Txn logs are fetched...
       const currentBlock = await provider.getBlockNumber();
       const txnLogs = await contract.queryFilter("MintLog",0,currentBlock);
    //    console.warn(txnLogs);
       for(let i =0;i<txnLogs.length;i++){
        if(txnLogs[i].args[1] == walletAddress)
     console.warn(txnLogs[i].args.message);
    }
      
    } catch (error) {
        console.log(`Error occured ${error}`)
    }
   }

    return(

    <>
          <button type="button" class="btn btn-primary" onClick = {viewNFT}>View NFT</button>
          <input type="text" placeholder = "tokenID" onChange={e=>setTokenId(e.target.value)}></input>
        </>
    )
}
export default ViewNFT;
