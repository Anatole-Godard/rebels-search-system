import React, {createContext, useContext, useEffect, useState} from 'react';


const UserContext = createContext({});

export const UserProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const handleAccessTokenChange = () => {
        if (token) {
            localStorage.setItem('token', token);
        } else if (!token) {
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        handleAccessTokenChange();
    }, [token]);

    return (<UserContext.Provider value={{token, setToken}}>
        {children}
    </UserContext.Provider>);
}

export const useUser = () => useContext(UserContext);
