import {React} from 'react';
import {ethers} from 'ethers';
import {contractAddress, abi} from './common.js';

function IssueNFT(){

    const [walletAddress,setWalletAddress] = ("");
    const [uri,setUri] = ("");
    const [message,setMessage] = ("");
    const [reward,setReward] = ("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    const issueNFT = async()=>{

    try {
        //API CALL code....
        

     
        let arr = [];
        let msg;
        // const issue =await contract.safeMint(walletAddress,uri,message,reward);
        // const issue =await contract.safeMint("0x47b7772B80CD7c70F6789FaBC18D23311Fc6329d",
        // "https://gateway.pinata.cloud/ipfs/QmYnnjkVv2i39bGM334r3eqnHGzMw4cTUsDQDA14kHs5Gd",
        // "NFT issued, with Reward",true);
        const issue =await contract.safeMint("0x47b7772B80CD7c70F6789FaBC18D23311Fc6329d",
        "https://gateway.pinata.cloud/ipfs/QmYnnjkVv2i39bGM334r3eqnHGzMw4cTUsDQDA14kHs5Gd",
        "NFT issued, with Reward",true);
        console.warn(issue);
       const log = contract.on("MintLog",(_from,_to,_nftURI,message,isRewarded,isRedeemed,event)=>{

           console.warn(`Txn Msg: ${message}`);
            msg = message;
        })
    const currentBlock = await provider.getBlockNumber();
    // console.warn(currentBlock);
    const mintLogs = await contract.queryFilter("MintLog",0,currentBlock)
    console.warn(mintLogs);
        // log.wait();
        // console.warn("cocmplet");

    } catch (error) {
        console.warn(`${error}`)
    }
   }
const filters = async()=>{
    let arr1=[];
    const currentBlock = await provider.getBlockNumber();
    const allLogs = await contract.queryFilter("MintLog",0,currentBlock);
    // console.warn(allLogs);
    for(let i=0;i<allLogs.length;i++){
        if(allLogs[i].args[1]=="0x47b7772B80CD7c70F6789FaBC18D23311Fc6329d"){
            let msg = allLogs[i].args.message;
            console.warn(allLogs[i].args.message);
            arr1.push(msg);
            // console.warn(arr1[0]);
        }
    }
   console.warn(arr1.length);
    // console.warn(allLogs)
}

    return(

    <>
          {/* <button type="button" class="btn btn-primary" onClick = {issueNFT}>Issue NFT</button> */}
          <button type="button" class="btn btn-primary" onClick = {filters}>Filter</button>
          {/* <input type="text" class="form-control" placeholder = "walletAddress" onChange={e=>setWalletAddress(e.target.value)}></input>
          <input type="text" class="form-control" placeholder = "message" onChange={e=>setMessage(e.target.value)}></input> */}
        </>
    )
}
export default IssueNFT;