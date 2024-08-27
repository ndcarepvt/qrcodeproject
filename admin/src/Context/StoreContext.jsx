import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const storeContext = createContext(null)

const StoreContextProvider = (props) =>{

    let URL = "http://localhost:4000"
    const [token, setToken] = useState("")

    async function loadData(){
      
      
        let loginToken = localStorage.getItem("token")
        console.log(loginToken);
        if(loginToken){
          setToken(loginToken)
          
        }
      }
      
      
        useEffect(() => {
          
      
          loadData()
          
        }, [])
    

    const contextValue = {
        URL,
        token,
        setToken
    }

    return(
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
        )
}

export default StoreContextProvider