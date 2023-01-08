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
        // FetchNFTs(user.userAccount,contractAddress,setNFTs)
        FetchNFTs("0xCb2006BFFef96d9EaD1C81163BB64bCf5209a383","0x972e88b57116E2dC4aB9E67eE0993add41920683",setNFTs)
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