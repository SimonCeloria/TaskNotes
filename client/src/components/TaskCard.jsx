import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toggleTaskDone } from "../api/tasks.api";
import toast from "react-hot-toast";
import { Card, CardContent, Typography, Button } from "@mui/material";

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
        <Card
            sx={{
                "@media (max-width: 600px)": {
                    minWidth: "95vw",
                },
                width: "100%",
                backgroundColor: "#ffc8dd",
            }}
        >
            <CardContent>
                <Typography variant="h5" component="div">
                    {task.title}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        maxHeight: 50,
                        minHeight: 50,
                        overflowY: "auto",
                        wordBreak: "break-word",
                    }}
                >
                    {task.description}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/edit/${task.id}`)}
                    sx={{ mt: 2 }}
                >
                    Edit
                </Button>
                {isDone ? (
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
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default TaskCard;
