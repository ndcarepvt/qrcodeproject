import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const URL = process.env.DB_URI;
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [kyc, setKyc] = useState(false);
  const [notification, setNotification] = useState(true);

  const fetchUserData = useCallback(async (token) => {
    try {
      const response = await axios.post(URL + "/api/user/getuserdetails", {}, { headers: { token } });
      if (response.data.success) {
        setUserData(response.data.userData);
        const user = response.data.userData
        if(user.kyc === "Completed"){
          setKyc(true)
        } else {
          setKyc(false)
        }
        
        if (notification) {
          toast.success(response.data.message);
        }


      } else {
        console.log("hi");
        
        if (response.data.message === "Expire token, please log in again."|| response.data.message === "Invalid token, please log in again.") {
          toast.error(response.data.message);
          setToken("");
          localStorage.removeItem("token");
          navigate('/');
        } else if (notification) {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      
      if (error.response.data.message == "Expired token, please log in again." || error.response.data.message == "Invalid token, please log in again." ) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
        localStorage.removeItem("token");
        setToken("");
        navigate('/'); 
        
      } else if (notification) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  }, [notification]);

  const loadData = useCallback(() => {
    const loginToken = localStorage.getItem("token");
    if (loginToken) {
      setToken(loginToken);
      fetchUserData(loginToken);
    }
  }, [fetchUserData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(() => ({
    URL,
    token,
    setToken,
    userData,
    setUserData,
    kyc,
    setKyc,
    fetchUserData,
    notification,
    setNotification,
  }), [URL, token, userData, kyc, notification, fetchUserData]);

  return (
    <storeContext.Provider value={contextValue}>
      {props.children}
    </storeContext.Provider>
  );
};

export default StoreContextProvider;
