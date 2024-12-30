import React, { useContext, useEffect, useState } from "react";
import { getTask } from "../api/tasks.api";
import TaskCard from "./TaskCard";
import { TaskContext } from "../util/context";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const { id } = useContext(TaskContext);
    useEffect(() => {
        async function loadTasks() {
            const response = await getTask(id);
            setTasks(response.data);
        }
        loadTasks();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 bg-white gap-3 mt-0 lg:ml-2 md:ml-2 p-0 w-full">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
