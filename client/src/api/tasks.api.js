import axios from "axios";

const token = localStorage.getItem("token");

axios.defaults.headers.common["Authorization"] = `Token ${token}`;

const baseURLTasks = axios.create({
    baseURL: "http://localhost:8000/tasks/",
});

const baseURLUsers = axios.create({
    baseURL: "http://localhost:8000/users/",
});

export const getAllTasks = () => {
    return baseURLTasks.get("/");
};

export const createTask = (task) => {
    return baseURLTasks.post("/", task);
};

export const deleteTask = (id) => {
    return baseURLTasks.delete(`/${id}/`);
};

export const updateTask = (task, idTask) => {
    return baseURLTasks.put(`/${idTask}/`, task);
};

export const getTask = (idTask) => {
    return baseURLTasks.get(`/${idTask}/`);
};

export const getTasks = (id) => {
    return baseURLTasks.get(`/${id}/user_tasks/`);
};

export const updateDescription = (content, idTask) => {
    console.log("Contenido que envio", content);

    return baseURLTasks.patch(`/${idTask}/update_document/`, {
        description: content.trim(),  // Limpiar el contenido antes de enviarlo
    });
};

export const toggleTaskDone = (id) => {
    return baseURLTasks.patch(`/${id}/toggle_done/`);
};

export const loginUser = async (user) => {
    try {
        const res = await baseURLUsers.post(`/login/`, user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const registerUser = async (user) => {
    try {
        const res = await baseURLUsers.post(`/register/`, user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
