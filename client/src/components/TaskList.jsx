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
        <div className="grid lg:grid-cols-5 sm:grid-cols-3 md:grid-cols-4 bg-transparent gap-3 mt-0 lg:ml-2 md:ml-2 pl-3 w-full">
            {tasks.map((task) => (
                <div className="flex justify-center" key={task.id}>
                    <TaskCard key={task.id} task={task} />
                </div>
            ))}
        </div>
    );
};

export default TaskList;
