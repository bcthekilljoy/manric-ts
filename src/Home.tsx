import { TextField, Button, Divider, Paper } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { DataGrid, GridApi } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import './App.css';
import axios from 'axios';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(10),
      minWidth: '60%',
      textAlign: 'center',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    grid: {
      margin: '0 auto',
      position: 'relative',
      display: 'grid',
      height: '50vh',
      width: '80%',
      gridTemplateColumns: 'repeat(2,minmax(25rem, 1fr))',
      gap: '40px',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(auto-fit ,minmax(15rem, 1fr))',
        height: '100vh',
        width: 'auto',
      },
      [theme.breakpoints.between('sm', 'md')]: {
        gridTemplateColumns: 'repeat(2,minmax(15rem, 1fr))',
        height: '50vh',
        width: 'auto',
      },
    },
    employees: {
      background: '#C23B23',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxHeight: '50vh',
      justifyContent: 'space-evenly',
      '& > span': { color: 'white' },
    },
    locations: {
      background: '#03C03C',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxHeight: '50vh',
      justifyContent: 'space-evenly',
      '& > span': { color: 'white' },
    },
    projects: {
      background: '#579ABE',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxHeight: '50vh',
      justifyContent: 'space-evenly',
      '& > span': { color: 'white' },
    },
    reports: {
      background: '#F39A27',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxHeight: '50vh',
      justifyContent: 'space-evenly',
      '& > span': { color: 'white' },
    },
  })
);

function App() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div style={{ textAlign: 'center' }}>MANRIC</div>
      <div className={classes.toolbar} />
      <div className={classes.grid}>
        {buttons.map((e) => (
          <Paper
            className={classes[e.class]}
            elevation={10}
            onClick={() => {
              window.location.pathname = `${e.path}`;
            }}
            style={{ cursor: 'pointer' }}
          >
            <Icon style={{ color: '#fff', fontSize: '100px' }}>{e.icon}</Icon>
            <span>{e.text}</span>
          </Paper>
        ))}
      </div>
    </div>
  );
}

const buttons = [
  {
    path: '/employees',
    icon: 'groups',
    class: 'employees',
    text: 'Employees',
  },
  {
    path: '/locations',
    icon: 'explore',
    class: 'locations',
    text: 'Locations',
  },
  {
    path: '/projects',
    icon: 'apartment',
    class: 'projects',
    text: 'Projects',
  },
  {
    path: '/reports',
    icon: 'summarize',
    class: 'reports',
    text: 'Reports',
  },
];

export default App;
