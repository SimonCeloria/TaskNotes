import React from "react";
import TaskList from "../components/TaskList";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import WorkIcon from "@mui/icons-material/Work";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";

const NAVIGATION = [
    { segment: "", title: "All tasks", icon: <DashboardIcon /> },
    { segment: "work", title: "Work tasks", icon: <WorkIcon /> },
    { segment: "tasks-create", title: "Create task", icon: <WorkIcon /> },
    { segment: "account", title: "Account", icon: <SwitchAccountIcon /> },
];

const theme = extendTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1920,
            xl: 1920,
        },
    },
});

function TasksPage() {
    return (
        <AppProvider
            navigation={NAVIGATION}
            theme={theme}
            branding={{
                logo: <img src="/logoPaws.svg" alt="MUI logo" />,
                title: "",
                homeUrl: "/toolpad/core/introduction",
            }}
        >
            <DashboardLayout
                sx={{
                    backgroundImage: "url(/fondos/dog_and_cat.svg)",
                    "& .MuiDrawer-paper": {
                        backgroundColor: "#ffc8dd",
                    },
                    "& .MuiAppBar-root": {
                        backgroundColor: "#ffc8dd",
                        color: "white",
                    },
                }}
            >
                <Grid>
                    <TaskList />
                </Grid>
            </DashboardLayout>
        </AppProvider>
    );
}

export default TasksPage;
