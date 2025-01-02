import React, { useContext, useEffect, useState } from "react";
import { getTasks } from "../api/tasks.api";
import TaskCard from "./TaskCard";
import { TaskContext } from "../util/context";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const { id } = useContext(TaskContext);
    useEffect(() => {
        async function loadTasks() {
            const response = await getTasks(id);
            setTasks(response.data);
        }
        loadTasks();
    }, []);

    return (
        <div className="flex flex-wrap w-full">
            {tasks.map((task) => (
                <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={task.id}>
                    <TaskCard key={task.id} task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
