import React, { createContext, useEffect, useState } from 'react'
export const authContextApi=createContext()
function AuthContext({children}) {
  const [isAuthorized,setIsAuthorized]=useState(false)

  const[user,setUser]=useState("")
  console.log(user);


  useEffect(() => {
    if(sessionStorage.getItem("user")){
      setUser(JSON.parse(sessionStorage.getItem("user")))
    }
    else{
      setUser("")
    }
   
  }, [])




  
  useEffect(() => {
      if(sessionStorage.getItem('token')){
          setIsAuthorized(true)
      }
      else{
          setIsAuthorized(false)
      }
    
  }, [])
  return (
    <>
    <authContextApi.Provider value={{user,setUser,isAuthorized,setIsAuthorized}}>
        {children}
    </authContextApi.Provider>
    
    </>
  )
}

export default AuthContext