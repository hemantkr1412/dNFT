import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";

import { ethers } from "ethers";

const UserState = (props) => {
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;
  const signer = provider != null ? provider.getSigner() : null;

  const [isConnected, setIsConnected] = useState(false);
  const [userAccount, setUserAccount] = useState("");
  const [isToken, setIsToken] = useState(false);
  const [status,setStatus]= useState(false);
  const [admin,setAdmin] = useState(false)

 

  useEffect(() => {
    if (signer != null) {
      signer
        .getAddress()
        .then((res) => {
          setUserAccount(res);
          setIsConnected(true);
          if(userAccount==="0xcebFD12bA1e85a797BFdf62081785E9103A96Dd3"){
            setAdmin(true)
          }
        })
        .catch((err) => {
          setIsConnected(false);
        });
    } else {
      setIsConnected(false);
    }
  });

  const iswalletAvailable = window.ethereum != null;

  const login = async () => {
    await provider
      .send("eth_requestAccounts", [])
      .then((res) => {
        setIsConnected(true);
      })
      .catch((err) => {});

    if (signer != null) {
      await signer
        .getAddress()
        .then((res) => {
          setUserAccount(res);
          setIsConnected(true);
        })
        .catch((err) => {
          setIsConnected(false);
        });
    }
  };

  return (
    <UserContext.Provider
      value={{
        signer,
        provider,
        login,
        iswalletAvailable,
        isConnected,
        userAccount,
        isToken,
        setIsToken,
        status,
        setStatus,
        admin,
        setAdmin
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
