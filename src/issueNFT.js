import { React,useState} from "react";
import { ethers } from "ethers";
import { contractAddress, abi } from "./common.js";

function IssueNFT() {
  const [walletAddress, setWalletAddress] = useState("");
  const [uri, setUri] = useState("");
  const [message, setMessage] = useState("");
  const [reward, setReward] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  const issueNFT = async () => {
    try {
      //API CALL code and get all the variable values.



      //Format for JSON file
      /*{
  "properties": {
      "name": "ABC HOTEL",
      "description": {
          "type": "string",
          "description": "NFT issued to authentic member of ABC Hotel"
      },
      "image": "https://gateway.pinata.cloud/ipfs/QmRUheYjxM4TkBNyVaDcmod554QtXSUBm1yoNAz3c1pPJ3"
  },
  "attributes":[
    {
        "owner":"0xcdsf.....",
        "rewardDetails":{
          "reward":"2 Night Stay",
          "data":"01/01/2023"
        },
        "redeemStatus":"Unclaimed"
    }
]
} */

//Smart contract function calling starts from here................

      //Dummy variables in function....

      // const issue =await contract.safeMint("0x47b7772B80CD7c70F6789FaBC18D23311Fc6329d",
      // "https://gateway.pinata.cloud/ipfs/QmYnnjkVv2i39bGM334r3eqnHGzMw4cTUsDQDA14kHs5Gd",
      // "NFT issued, with Reward",true);

    //   const issue = await contract.safeMint(
    //     walletAddress,
    //     uri,
    //     message,
    //     reward
    //   );
    //   console.warn(issue);//Safe Mint function will be called from contract...

      const currentBlock = await provider.getBlockNumber();//return current block number
      const allLogs = await contract.queryFilter("MintLog", 0, currentBlock);
      console.warn(currentBlock); //All the txn logs since deployment

/*##################### Txn log for specific user ################################ */

      let arr1 = [];
      for (let i = 0; i < allLogs.length; i++) {
        if (allLogs[i].args[1] == walletAddress) {
          let msg = allLogs[i].args.message;
          console.warn(msg);
          arr1.push(msg);
        }
      }
      console.warn(arr1.length);
    } catch (error) {
      console.warn(`${error}`);
    }
  };
  const currentUser = async()=>{
    const ownerSel = document.querySelector("#ownerAddress");
    const owner = await contract.owner();
    ownerSel.innerHTML = `Owner Address:${owner}`;
    console.log(owner);
  }
  return (
    <>
      <button type="button" class="btn btn-primary" onClick={issueNFT}>
        Filter
      </button>
      <button type="button" class="btn btn-primary" onClick={currentUser}>
        Current Owner
      </button>
      <div id = "ownerAddress">Owner Address:0</div>
    </>
  );
}
export default IssueNFT;
