import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "../src/pages/TasksPage";
import TasksFormPage from "../src/pages/TasksFormPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./util/ProtectedRoutes";
import { TaskContextProvider } from "./util/context";
import Auth from "./pages/Auth";

function App() {
    return (
        <TaskContextProvider>
            <BrowserRouter>
                    <Routes>
                        <Route path="/auth" element={<Auth />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/" element={<TasksPage />} />
                            <Route
                                path="/tasks-create"
                                element={<TasksFormPage />}
                            />
                            <Route
                                path="/:id"
                                element={<TasksFormPage />}
                            />
                        </Route>
                    </Routes>
                    <Toaster />
            </BrowserRouter>
        </TaskContextProvider>
    );
}

export default App;
