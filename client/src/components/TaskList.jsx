import React, { useEffect, useState } from "react";
import { getAllTasks } from "../api/tasks.api";
import TaskCard from "./TaskCard";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const response = await getAllTasks();
      setTasks(response.data);
    }
    loadTasks();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 m-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
