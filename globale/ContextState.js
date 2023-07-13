import React, {useState} from 'react'

export const MyContext = React.createContext();

export const MyProvider = ({ children }) => {
    const [myArticles, setMyArticles] = useState([]);
    return (
        <MyContext.Provider
            value={{
                myArticles, 
                setMyArticles,
            }}>
            {children}
        </MyContext.Provider>
    )
}
