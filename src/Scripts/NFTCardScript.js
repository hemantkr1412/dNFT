import { FetchNFTs } from "../APIs/FecthNFT";
import UserContext from "../context/userContext/UserContext";
import { useContext,useEffect,useState } from "react";


const NFTCardScript =() =>{
    const [owner, setOwner] = useState("");
    const [contractAddress, setContractAddress] = useState("");
    const [NFTs, setNFTs] = useState("");
    useEffect(() =>{

    },[NFTs])
    


    const user = useContext(UserContext);

    user.isConnected && (
        FetchNFTs(user.userAccount,contractAddress,setNFTs)
    )
    if (NFTs){
        user.setStatus(true)

    }
    const handleGetDnftBywallet=(walletAdd) =>{
        setNFTs("")
        // FetchNFTs(walletAdd,contractAddress,setNFTs)
        // console.log(NFTs)
    }
    return{
        NFTs,
        handleGetDnftBywallet
    };





}

export default NFTCardScript;