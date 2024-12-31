import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth") === "true");
    const [id, setID] = useState(localStorage.getItem("id") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [username, setUsername] = useState(localStorage.getItem("username") || null);

    useEffect(() => {
        const savedAuth = localStorage.getItem("isAuth");
        if (savedAuth) {
            setIsAuth(JSON.parse(savedAuth));
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem("isAuth", JSON.stringify(isAuth));
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }, [isAuth]);

    useEffect(() => {
        try {
            if (id !== null) {
                localStorage.setItem("id", id);
            }
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }, [id]);

    useEffect(() => {
        try {
            if (token !== null) {
                localStorage.setItem("token", token);
            }
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }, [token]);

    useEffect(() => {
        try {
            if (username !== null) {
                localStorage.setItem("username", username);
            }
        } catch (e) {
            console.error("Error saving to localStorage", e);
        }
    }, [username]);

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
