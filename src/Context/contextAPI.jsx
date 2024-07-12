import React, { createContext, useState } from 'react'

export const AddData = createContext();

const contextAPI = ({children}) => {
    const [userAdd, setUserAdd] = useState("");
  return (
    <>
       <AddData.Provider value={{userAdd,setUserAdd}}>
            {children}
       </AddData.Provider> 
    </>
  )
}

export default contextAPI