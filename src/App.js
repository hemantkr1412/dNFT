import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField, Typography } from '@mui/material';
import Navbar from './Navbar';
import { InputField } from './InputField';
import UserState from './context/userContext/userState';
import { useContext } from "react";
import UserContext from './context/userContext/UserContext';
import { NFTCard } from './NFTCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IssueNFT from './issueNFT';
import ViewNFT from './viewNFT';
import TransferOwner from './transferOwnership';


function App() {
  const [age, setAge] = React.useState(true);
 
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
    <TransferOwner></TransferOwner>
    <ViewNFT></ViewNFT>
    <IssueNFT></IssueNFT>
    <UserState>
      <Navbar />
      <NFTCard />
      <ToastContainer />
    </UserState>
      </>
  );
}

export default App;
