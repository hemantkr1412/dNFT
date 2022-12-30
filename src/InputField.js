import React from 'react';
import {  Box} from '@mui/material';
import {AppBar, Toolbar} from "@mui/material";
import { Button, TextField, Typography } from '@mui/material';
import { useContext } from 'react';
import UserContext from './context/userContext/UserContext';


export const InputField = () => {
  const user = useContext(UserContext)



  return (
    <div>

      <AppBar 
      position="sticky"
      sx={{
        margin: 'auto',
        marginTop: 2,
        marginBottom: 8,
        width: '30%',
        borderRadius: 10,
        minWidth:"300px",
        background:"white"}}
      >
        <Toolbar>
          
            <Box margin={'auto'} marginBottom ='auto' style={{display:"flex"}} >
                <TextField label="Token" variant="standard" sx={{borderRadius: 10,}}  />
                <Button type='submit' variant="contained" sx={{borderRadius: 10,}}
                onClick={()=>{
                  user.setIsToken(true)
                }}
                >Get dNFT</Button>
            
            </Box> 

        </Toolbar>
    </AppBar>




  </div>
  )
}