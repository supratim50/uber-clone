import React, { createContext, useContext, useState } from 'react';

export const CaptainDataContext = createContext();


const CaptainContext = ({children}) => {

  const [captainData, setCaptainData] = useState({});

  return (
    <CaptainDataContext.Provider value={{captainData, setCaptainData}}>
        {children}
    </CaptainDataContext.Provider>
  )
}

// export const useCaptainContext = () => {
//   useContext(CaptainDataContext)
// }
export default CaptainContext