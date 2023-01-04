import { Button, Card, InputLabel, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';
import walletLogo from "./wallet.png"
import NFTImage from "./NFTImage.png";
import NFTCardScript from './Scripts/NFTCardScript';
import Loading from "./Loading.gif";
import data from './data.json';
import axio from "axios";
import {create as IPFSHTTPClient,globSource} from 'ipfs-http-client';
import {Buffer} from 'buffer';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// const Moralis = require('moralis').default;
// const { EvmChain } = require('@moralisweb3/common-evm-utils');
import GenrateURI from "./APIs/GenrateURI";
import {TailSpin} from "react-loader-spinner";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data2 from "./data.json"
import {contractAddress, abi} from "./common.js";
// import { extractEventHandlers } from '@mui/base';
import {ethers} from 'ethers';





export const NFTCard = () => {
    const user = useContext(UserContext);
    const { NFTs} = NFTCardScript();
    const [editId,setEditId] = useState("")
    const [memberShip,setMembership]=useState("PREMIUM")
    const [discount,setDiscount]=useState(30)
    const [loading, setLoading] = React.useState(false);

    const projectId = "2Jlv5EBQnZrIkyfYxgQ85PYuUo6";
    const projectSecret = "89e836478d0c9351b7e6b68a0d898d99";
    const auth = 'Basic ' + Buffer.from(projectId + ":" + projectSecret).toString('base64')

    const client = IPFSHTTPClient({
        host:'ipfs.infura.io',
        port:5001,
        protocol: 'https',
        headers: {
            authorization: auth
          }
      });

    // const client = IPFSHTTPClient("https://ipfs.infura.io:5001/api/v0")
    const [uri,setUri] = useState("")



    const [isDisable,setisDisable]=useState(true)
    const [inputStyle,setInputStyle]=useState({
        background:"#f7f5f5",
        border:"0px solid",
        borderBottom:"1px dashed"
    })
    const [btn,setBtn] = useState("Edit")
    const [inputDiscount,setInputDiscount] = useState("")
    const disableInputStyle ={color:"black",backgroundColor:inputStyle.background,border:inputStyle.border,fontSize:"1rem",width:"100px",borderBottom:inputStyle.borderBottom}
    const disableInputDisscountStyle ={color:"black",backgroundColor:inputStyle.background,border:inputStyle.border,fontSize:"1rem",width:"50px",borderBottom:inputStyle.borderBottom}
    
    const handleClick= async(id,btn,image,tokenId) =>{
        const provider =new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        if(btn==="edit"){
            setEditId(id)
        }else{
            
            try{
                setLoading(true)
                // GenrateURI(memberShip,inputDiscount,image).then((res)=>{
                    //     if(res===400){
                        //         setLoading(false)
                        //         setEditId("") 
                //         toast.error("Updation Faild") 
                //     }else{
                //     console.log(res[0])
                //     setLoading(false)
                //     setEditId("")
                //     toast.success("Successfully Update")
                //     }
                // })

                var obj ={
                    attributes: [
                      {
                        color: "Dark Blue II",
                        memberShip,
                        inputDiscount
                      }
                    ],
                    description: `This is for ${memberShip} users`,
                    image: "https://ipfs.io/ipfs/QmV2NaqzSgqgurypqm4UQYkRDLy6g8FMmvVoUkVdAhheN1",
                    name: "ABC HOTEL"
                  }
                  obj = JSON.stringify(obj)
                
                    const added = await client.add(obj);
                    const jsonURI ="https://bit.infura-ipfs.io/ipfs/"+ added.path;
                   await setUri(jsonURI);
                    console.log(jsonURI);
                    //Ethers code
                    const changeUserNFT = await contract.changeUserNFT(tokenId,uri);
                    console.log(changeUserNFT.data);    
                    
                    // const owner = await contract.owner();
                    // console.log(owner);






                    setLoading(false)
                    setEditId("")
                    toast.success("Successfully Update")
                    

            }catch (error){
                toast.warn("Updation Faild")
            }
             
        }
        
 }

    const handleChange = (e)=>{
        setMembership(e.target.value)
        
    }


 
    // const handleAPI = async() =>{
    //         console.log("Clicked")
    //         try {
    //             const added = await client.add(walletLogo);
    //             setUri(added.path)
    //             console.log(added.path)
                
    //           } catch (error) {
    //             console.log(error)
    //           }
    // }


    const handleChangeDisscount = (e) =>{
        setInputDiscount(e.target.value)
    }
   
    

  return (
    <>
    {user.iswalletAvailable ? 
    (
    <>
    {
        user.isConnected ? (
            <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>

                {user.status ? 
                (
                    (NFTs) ? NFTs.map((NFT,index) => {
                            
                        return (
                            <>

                            <Card key={index} sx={{ width:"25%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
                                <Box sx={{display:{xs:'block',md:"flex"},justifyContent:"space-around",margin:"auto",marginTop:"50px"}}>
                                    <Box>
                                        <img src={NFT.media[0].gateway} width={300} height={300}/>
                                    </Box>
                                    <Box sx={{marginLeft:"15px"}}>
                                            <Typography variant='h5' sx={{fontWeight:"700"}}>ABC HOTEL</Typography>
                                            {/* <Box sx={{marginTop:"50px"}}>
                                                <Typography>MEMBERSHIP : </Typography>
                                                <input style={disableInputStyle} type="text" value={"PREMIUM"} class="details-dialog" disabled={isDisable} />
                                                <Typography mt={5} >DISCOUNT : 50% </Typography>
                                            </Box>
                                            <Box sx={{marginTop:"25px",color:"black"}} >
                                                <Button variant="outlined"
                                                onClick={
                                                    ()=>{
                                                        setisDisable(false)
                                                        setInputStyle({
                                                            background:"#E5E5F7",
                                                            border:"0px solid",
                                                            borderBottom:"1px solid black"
                                                        })
                                                        if(btn==="Edit"){
                                                            setBtn("Save")
                                                        }else{
                                                            setBtn("Edit")
                                                            setisDisable(true)
                                                            setInputStyle({
                                                                background:"transparent",
                                                                border:"0px solid",
                                                                borderBottom:"0px solid black"
                                                            })
                                                        }
                                                        
                                                    }
                                                }
                                                
                                                >
                                                    {btn} 
                                                </Button>
                                            </Box> */}
                                            <Box sx={{marginTop:"50px"}}>
                                                <Typography color={"green"} sx={{fontWeight:"600"}}>MEMBERSHIP : </Typography>
                                                {editId !==index && <Typography>{NFT.metadata.attributes[0].value.slice(0,7) ?NFT.metadata.attributes[0].value.slice(0,7):memberShip}</Typography>}
                                                {/* {editId===index && <input style={disableInputStyle} type="text" value={NFT.metadata.attributes[0].value.slice(0,7) ?NFT.metadata.attributes[0].value.slice(0,7):memberShip} onChange={(e)=> handleChange(e,"member")}  class="details-dialog"  />} */}
                                                {editId===index &&
                                                    
                                                    <FormControl sx={{mt:2 ,minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small">MEMBERSHIP</InputLabel>
                                                        <Select

                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            value={memberShip}
                                                            onChange={handleChange}
                                                            label="MEMBERSHIP"
                                                            >
                                                            <MenuItem value={"PREMIUM"}>PREMIUM</MenuItem>
                                                            <MenuItem value={"REGULAR"}>REGULAR</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    
                                                }
                                                {/* <Typography mt={5} >DISCOUNT : 50% </Typography> */}
                                                <Typography sx={{display:"flex",marginTop:"10px",color:"green",fontWeight:"600"}}>DISCOUNT :</Typography>
                                                <Box sx={{display:"flex"}}>
                                                    {editId !==index && <Typography>{NFT.metadata.attributes[0].discount?NFT.metadata.attributes[0].discount:discount}</Typography>}
                                                    {/* {editId===index && <input style={disableInputDisscountStyle} type="text" value={NFT.metadata.attributes[0].discount?NFT.metadata.attributes[0].discount:discount} class="details-dialog" onChange={(e)=> handleChange(e,"discount")}  />} */}
                                                    {editId===index && <input style={disableInputDisscountStyle} type="text" value={inputDiscount} class="details-dialog" onChange={handleChangeDisscount}  />}
                                                    <Typography>% OFF*</Typography>
                                                </Box>
                                            </Box>
                                            {user.admin && <Box sx={{marginTop:"25px",color:"black"}} >
                                            {editId !==index && <Button variant="outlined" onClick={()=>handleClick(index,"edit")}>
                                                    Edit
                                                </Button>}
                                                
                                                {editId===index &&<> {loading ? <TailSpin color='#A3A6FA' height={30}/> :
                                                <> {editId===index && <Button variant="outlined"
                                                onClick={()=>
                                                    handleClick(index,"save",NFT.media[0].gateway,NFT.id.tokenId)}  
                                                >
                                                    Save
                                                </Button>}
                                                </>
                                                }</>}
                                                
                                                {/* {editId===index && <Button variant="outlined"
                                                onClick={()=>handleClick(index,"save")}  
                                                >
                                                    Save
                                                </Button>} */}                                              

                                            </Box>}
                                    </Box>
                                </Box>
                                <Box sx={{ margin:"45px"}}>
                                    <Typography >TOKEN ID :</Typography>
                                    <Typography sx={{fontSize:"0.7rem"}} >{NFT.id.tokenId }</Typography>
                                    <Typography sx={{marginTop:"10px"}} variant='h6'>
                                        Owner:
                                    </Typography>
                                    <Typography sx={{fontSize:"0.7rem"}}>
                                        {user.userAccount}
                                    </Typography>
            
                                </Box>
                            
                            </Card>
            
                    </>
                        )
                    }) : <div>No NFTs found</div>
                
                ):(
                    <>
                        <Box sx={{backgroundColor:"white",width:"350px",height:"40vh",display:"flex",flexDirection:"column",boxShadow:"10px 5px 5px #85878c"}}>
                            <Box margin={"auto"}>
                            <img src={Loading} />
                            </Box>
                            <Typography margin={"auto"}>Please Wait</Typography>
                        </Box>
                    </>

                )}

            </Box>
        ):
        (
        <>
        <Card sx={{ width:"40%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"auto",marginTop:"20px",minWidth:"350px"}}>
        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",margin:"auto",marginTop:"10vh"}}>
            <Box margin={"auto"}>
            <img src={walletLogo} width={200}/>
            </Box>
            <Button sx={{marginTop:"20px"}} color='warning' variant='contained'
            margin={"auto"}
            onClick={() => {
                user.login();
            }}>
            Connect
          </Button>
          <Typography sx={{marginTop:"20px"}} variant='h6'>Connect Your Wallet</Typography>
        </Box>
        </Card>
        </>)
    }

    </>
    )
    :
    (
    <>
        <Card sx={{ width:"40%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"auto",marginTop:"20px",minWidth:"350px"}}>

        <Box sx={{ display:"flex",flexDirection:"column",justifyContent:'center',alignItems:"center",margin:"auto",marginTop:"10vh"}}>
            <Box margin={"auto"}>
            <img src={walletLogo} width={200}/>
            </Box>
            <Button sx={{marginTop:"20px"}} variant='contained'
            margin={"auto"}
            onClick={() => {
                window.open("https://metamask.io");
            }}>
            GET WALLET
          </Button>
          <Typography sx={{marginTop:"20px"}} variant='h6'>Please Download Wellet</Typography>

        </Box>
        </Card>
    </>
    )}
  </>
  )
}
