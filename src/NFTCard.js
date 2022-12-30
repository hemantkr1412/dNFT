import { Button, Card, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React from 'react';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';
import walletLogo from "./wallet.png"
import NFTImage from "./NFTImage.png"


export const NFTCard = () => {
    const user = useContext(UserContext);
  return (
    <>
    {user.iswalletAvailable ? 
    (
    <>
    {
        user.isConnected ? (
        
        <>
        {
            user.isToken && 
            (
                <>
                <Card sx={{ width:"35%",height:"60vh",background:"white",boxShadow:"10px 5px 5px #85878c",margin:"auto",marginTop:"20px",minWidth:"350px"}}>
                    <Box sx={{display:"flex",justifyContent:"space-around",margin:"auto",marginTop:"50px"}}>
                        <Box>
                            <img src={NFTImage} width={300} height={300}/>
                        </Box>
                        <Box>
                            <Typography variant='h4' sx={{fontWeight:"700"}}>ABC HOTEL</Typography>
                            <Box sx={{marginTop:"50px"}}>
                                <Typography >MEMBERSHIP : PREMIUM</Typography>
                                <Typography >DISCOUNT : 50%</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ margin:"45px"}}>
                        <Typography  variant='h5'>TOKEN ID : 005</Typography>
                        <Typography sx={{marginTop:"10px"}} variant='h6'>
                            OWENER:
                        </Typography>
                        <Typography variant='h6'>
                            {user.userAccount}
                        </Typography>

                    </Box>
                   
                </Card>

                </>
            )

        }
        
        
        
        </>
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
