import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTaskDone } from "../api/tasks.api";

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
        <div className="w-25 mx-auto py-2 px-6">
            <div className="w-full bg-pink-300 rounded-lg border border-pink-300 mb-2 p-4">
                <div>
                    <h4 className="text-gray-800 font-bold mb-3">{task.title}</h4>
                    <p className="text-gray-800 text-sm">
                        This is a description of the task. You can add more
                        details here.
                    </p>
                </div>
                <div className="flex items-center justify-between text-gray-800 mt-4">
                    <p className="text-sm">{new Date(task.created).toLocaleString()}</p>
                    <button>Done</button>
                    <button className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-pencil"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z"></path>
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;

/*                 {isDone ? (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => onToggleDone(task.id)}
                        sx={{ mt: 2, ml: 1 }}
                    >
                        Done
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => onToggleDone(task.id)}
                        sx={{ mt: 2, ml: 1 }}
                    >
                        Incomplete
                    </Button> */
