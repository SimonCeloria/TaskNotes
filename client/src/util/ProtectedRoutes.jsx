import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { TaskContext } from "./context";

const ProtectedRoutes = () => {
    const { isAuth } = useContext(TaskContext);
    return isAuth ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoutes;
