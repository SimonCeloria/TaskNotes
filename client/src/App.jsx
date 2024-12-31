import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksPage from "../src/pages/TasksPage";
import TasksFormPage from "../src/pages/TasksFormPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./util/ProtectedRoutes";
import { TaskContextProvider } from "./util/context";
import Auth from "./pages/Auth";
import Editor from "./pages/MDTest";

function App() {
    return (
        <TaskContextProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                    <Route path="/auth" element={<Auth />} />
                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<TasksPage />} />
                        <Route
                            path="/edit/:id"
                            element={<TasksFormPage />}
                        />
                        <Route
                            path="/testmd"
                            element={<Editor />}
                        />
                    </Route>
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
                <Toaster />
            </BrowserRouter>
        </TaskContextProvider>
    );
}

export default App;
