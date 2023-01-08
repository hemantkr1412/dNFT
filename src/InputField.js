import React, { useState } from 'react';
import {  Box} from '@mui/material';
import {AppBar, Toolbar} from "@mui/material";
import { Button, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';
import NFTCardScript from './Scripts/NFTCardScript';
import {ethers} from 'ethers';
import {contractAddress, abi} from './common.js';
// import {uri} from './NFTCard.js';

export const InputField = () => {
  const user = useContext(UserContext);
  const { NFTs,handleGetDnftBywallet} = NFTCardScript();
  const [wallet,setWallet] = useState("")
  const [uri,setURI] = useState("");
  const mintNFT = async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
  try {
    const mint = await contract.safeMint(wallet,uri);
    console.log(mint);
  } catch (error) {
    console.log(`Error occured ${error}`);
  }

  }

  

  return (
    <div>

      <AppBar 
      position="sticky"
      sx={{
        margin: 'auto',
        marginTop: 2,
        marginBottom: 2,
        width: '30%',
        borderRadius: 10,
        minWidth:"350px",
        background:"white"}}
      >
        <Toolbar>
          
            <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                <TextField label="Wallet Address" variant="standard" sx={{borderRadius: 10,}}  />
                <Button type='submit' variant="contained" sx={{borderRadius: 10,}}
                onClick={mintNFT}
                >Issue NFT</Button>
            </Box>  
        </Toolbar>
    </AppBar>

    {/* <AppBar 
      position="sticky"
      sx={{
        margin: 'auto',
        marginTop: 1,
        marginBottom: 5,
        width: '30%',
        borderRadius: 10,
        minWidth:"350px",
        background:"white"}}
      >
        <Toolbar>
          
            <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                <TextField label="Wallet Address" variant="standard" sx={{borderRadius: 10,width:"350px"}} value={wallet} onChange={(e) => handleChange(e)} />
                <Button type='submit' variant="contained" sx={{borderRadius: 10,}}
                onClick={()=>{
                  handleGetDnftBywallet(wallet)
                }}
                >Get dNFT</Button>
            
            </Box>  
        </Toolbar>
    </AppBar> */}




  </div>
  )
}