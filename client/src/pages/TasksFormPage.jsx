import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { createTask, deleteTask, getTask, toggleTaskDone, updateTask } from "../api/tasks.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Navigation from "../components/Navigation";

const TasksFromPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            console.log("Editing task with id:", params.id);
            await updateTask(data, params.id);
            toast.success("Task updated successfully");
        } else {
            await createTask(data);
            toast.success("Task created successfully");
        }
        navigate("/");
    });

    const onDelete = async (id) => {
        console.log("Deleting task with id:", id);
        try {
            await deleteTask(id);
            navigate("/tasks");
            toast.success("Task deleted successfully");
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const res = await getTask(params.id);
                setValue("title", res.data.title);
                setValue("description", res.data.description);
            }
        }
        loadTask();
    }, []);

    return (
        <div className="max-w-xl mx-auto">
            <Navigation />
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="title"
                    {...register("title", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                />
                {errors.title && <span>This field is required</span>}
                <textarea
                    rows={3}
                    placeholder="Description"
                    {...register("description", { required: true })}
                    className="bg-zinc-700 p-3 rounded-lg block w-full mb-3"
                ></textarea>
                {errors.description && <span>This field is required</span>}
                <button className="bg-indigo-500 p-3 font-bold rounded-lg block w-full mt-3">
                    Save
                </button>
            </form>
            {params.id && (
                <div className="flex items-center font-bold justify-end">
                    {" "}
                    <h1 className="text-center text-zinc-600 flex-grow">
                        Editing task {params.id}
                    </h1>{" "}
                    <button
                        className="bg-red-500 p-3 rounded-lg w-48 mt-2"
                        onClick={() => onDelete(params.id)}
                    >
                        Delete
                    </button>{" "}
                </div>
            )}
        </div>
    );
};

export default TasksFromPage;
