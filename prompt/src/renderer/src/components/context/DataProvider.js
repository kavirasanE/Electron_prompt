import { createContext, useState } from "react";


const DataContext =createContext({});

const DataProvider = ({children}) => {
      const[contextData,setContextData] =useState("hi from context")

    return(
        <DataContext.Provider value={{contextData,setContextData}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider