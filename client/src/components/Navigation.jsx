import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <div className="flex justify-between items-center p-4">
            <Link to="/tasks">
                <h1 className="font-bold text-3xl mb-4">Task App</h1>
            </Link>
            <button className="bg-indigo-500 px-3 py-2 rounded-lg hover:bg-indigo-600">
                <Link to="/tasks-create">Create task</Link>
            </button>
        </div>
    );
};

export default Navigation;
