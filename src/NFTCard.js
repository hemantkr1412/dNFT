import { Button, Card, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';
import walletLogo from "./wallet.png"
import NFTImage from "./NFTImage.png";
import NFTCardScript from './Scripts/NFTCardScript';
import Loading from "./Loading.gif"




export const NFTCard = () => {
    const user = useContext(UserContext);
    const { NFTs} = NFTCardScript();
    const [editId,setEditId] = useState("")
    const [memberShip,setMembership]=useState("PREMIUM")
    const [discount,setDiscount]=useState(30)

    const [isDisable,setisDisable]=useState(true)
    const [inputStyle,setInputStyle]=useState({
        background:"#f7f5f5",
        border:"0px solid",
        borderBottom:"1px dashed"
    })
    const [btn,setBtn] = useState("Edit")
    const disableInputStyle ={color:"black",backgroundColor:inputStyle.background,border:inputStyle.border,fontSize:"1rem",width:"100px",borderBottom:inputStyle.borderBottom}
    const disableInputDisscountStyle ={color:"black",backgroundColor:inputStyle.background,border:inputStyle.border,fontSize:"1rem",width:"50px",borderBottom:inputStyle.borderBottom}
    const handleClick=(id,btn) =>{
        if(btn==="edit"){
            setEditId(id)
        }else{
            setEditId("")
        }
        
    }

    const handleChange = (e,inpt)=>{
        if(inpt==="member"){
            setMembership(e.target.value)
        }else{
            setDiscount(e.target.value)
        }
        
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

                            <Card sx={{ width:"25%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"20px",minWidth:"350px",padding:"10px"}}>
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
                                                <Typography>MEMBERSHIP : </Typography>
                                                {editId !==index && <Typography>{NFT.metadata.attributes[0].value.slice(0,7) ?NFT.metadata.attributes[0].value.slice(0,7):memberShip}</Typography>}
                                                {editId===index && <input style={disableInputStyle} type="text" value={NFT.metadata.attributes[0].value.slice(0,7) ?NFT.metadata.attributes[0].value.slice(0,7):memberShip} onChange={(e)=> handleChange(e,"member")}  class="details-dialog"  />}
                                                {/* <Typography mt={5} >DISCOUNT : 50% </Typography> */}
                                                <Typography sx={{display:"flex",marginTop:"10px"}}>DISCOUNT :</Typography>
                                                <Box sx={{display:"flex"}}>
                                                    {editId !==index && <Typography>{NFT.metadata.attributes[0].discount?NFT.metadata.attributes[0].discount:discount}</Typography>}
                                                    {editId===index && <input style={disableInputDisscountStyle} type="text" value={NFT.metadata.attributes[0].discount?NFT.metadata.attributes[0].discount:discount} class="details-dialog" onChange={(e)=> handleChange(e,"discount")}  />}
                                                    <Typography>% OFF*</Typography>
                                                </Box>
                                            </Box>
                                            {user.admin && <Box sx={{marginTop:"25px",color:"black"}} >
                                            {editId !==index && <Button variant="outlined" onClick={()=>handleClick(index,"edit")}>
                                                    Edit
                                                </Button>}
                                                {editId===index && <Button variant="outlined"
                                                onClick={()=>handleClick(index,"save")}  
                                                >
                                                    Save
                                                </Button>}

                                            </Box>}
                                    </Box>
                                </Box>
                                <Box sx={{ margin:"45px"}}>
                                    <Typography >TOKEN ID :</Typography>
                                    <Typography sx={{fontSize:"0.7rem"}} >{NFT.id.tokenId }</Typography>
                                    <Typography sx={{marginTop:"10px"}} variant='h6'>
                                        OWENER:
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
