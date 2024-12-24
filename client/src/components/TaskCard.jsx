import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTaskDone } from "../api/tasks.api";
import toast from "react-hot-toast";

const TaskCard = ({ task }) => {
    const navigate = useNavigate();
    const [isDone, setIsDone] = useState(task.done);

    const onToggleDone = async (id) => {
        try {
            await toggleTaskDone(id);
            setIsDone(!isDone);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="block rounded-lg bg-white p-4 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {task.title}
            </h5>
            <p className="mb-4 text-base text-neutral-600 break-words max-h-32 min-h-32 overflow-y-scroll dark:text-neutral-200">
                {task.description}
            </p>
            <button
                type="button"
                onClick={() => navigate(`/tasks/${task.id}`)}
                className="inline-block rounded bg-primary px-3 py-1 hover:bg-zinc-900 text-xs font-medium uppercase leading-normal"
            >
                Edit
            </button>
            {isDone ? (
                <button
                    className="inline-block ml-2 px-2 py-1 rounded bg-green-500 hover:bg-green-700 text-white text-xs font-medium uppercase leading-normal"
                    onClick={() => onToggleDone(task.id)}
                >
                    Done
                </button>
            ) : (
                <button className="inline-block ml-2 px-2 py-1 hover:bg-red-900 rounded bg-red-500 text-white text-xs font-medium uppercase leading-normal"
                onClick={() => onToggleDone(task.id)}>
                    Incomplete
                </button>
            )}
        </div>
    );
};

export default TaskCard;
