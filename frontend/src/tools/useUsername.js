import { createContext, useContext, useState } from 'react';

const UsernameContext = createContext({
    username: "",
    changeUsername: () => {},
});

const UsernameProvider = (props) => {
    const [username, setUserName] = useState("");
    const changeUsername = (name) => {
        setUserName(name);
    };
    return ( 
        <UsernameContext.Provider
            value={{
                username,
                changeUsername,
            }}
            {...props}
        />
    );
};

function useUsername () {
    return useContext(UsernameContext);
}

export { UsernameProvider, useUsername };
