import axios from "axios";

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

export const updateTask = (task, id) => {
    return baseURLTasks.put(`/${id}/`, task);
};

export const getTask = (id) => {
    return baseURLTasks.get(`/${id}/`);
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
