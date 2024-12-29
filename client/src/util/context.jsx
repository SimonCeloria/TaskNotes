import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
    const [isAuth, setIsAuth] = useState(false);
    const [id, setID] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);

    useEffect(() => {
      console.log("Id cambiado a ", id);
    }, [id])

    return (
        <TaskContext.Provider
            value={{
                isAuth,
                setIsAuth,
                id,
                setID,
                token,
                setToken,
                username,
                setUsername,
            }}
        >
            {props.children}
        </TaskContext.Provider>
    );
}
