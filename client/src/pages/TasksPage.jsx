import React from 'react';
import TaskList from '../components/TaskList';
import { extendTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import WorkIcon from '@mui/icons-material/Work';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';

const NAVIGATION = [
    { kind: 'header', title: 'Main tasks' },
    { segment: 'all-task', title: 'All tasks', icon: <DashboardIcon /> },
    { segment: 'work', title: 'Work tasks', icon: <WorkIcon /> },
    { segment: 'tasks-create', title: 'Create task', icon: <WorkIcon /> },
    { kind: 'divider' },
    { kind: 'header', title: 'Settings' },
    { segment: 'account', title: 'Account', icon: <SwitchAccountIcon /> },
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
    <AppProvider navigation={NAVIGATION} theme={theme}>
      <DashboardLayout>
        <PageContainer sx={{ padding: 0, margin: 0 }}>
          <Grid container spacing={2} >
            <Grid xs={12}>
              <TaskList />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default TasksPage;
