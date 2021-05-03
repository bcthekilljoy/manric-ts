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
import './App.css';
import axios from 'axios';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column-reverse',
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      background: '#424242',
      color: 'white',
    },
    drawerClose: {
      overflowX: 'hidden',
      background: '#424242',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
      color: 'white',
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minWidth: '60%',
    },
    form: {
      flexGrow: 1,
      padding: theme.spacing(3),
      '& .MuiPaper-root': { padding: theme.spacing(1) },
    },
    Icon: {
      color: 'white',
    },
  })
);

function App() {
  const theme = useTheme();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [employees, setEmployees] = useState([]);
  const [fetch, setFetch] = useState(true);

  useEffect(() => {
    if (fetch === true) {
      axios.defaults.baseURL = 'http://localhost:5000';
      const data = axios.get('/location/fetch-location').then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      });
      setFetch(false);
    } else {
      console.log('false na');
      console.log(theme.mixins.toolbar);
    }
  }, [fetch]);

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const deleteUser = (thisRow) => {
    console.log(thisRow);
    axios({
      method: 'patch',
      url: '/user/delete-user',
      data: JSON.stringify({ info: thisRow['_id'] }),
      headers: { 'content-type': 'application/json' },
    }).catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    });
    setFetch(true);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 250, hide: true },
    { field: 'name', headerName: 'Location', width: 250 },
    { field: 'rate', headerName: 'Rate (PhP)', width: 250 },
    {
      field: '',
      headerName: 'Action',
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== '__check__' && !!c);
          const thisRow = {};

          fields.forEach((f) => {
            thisRow[f] = params.getValue(f);
          });

          return deleteUser(thisRow);
        };

        return <Button onClick={onClick}>Click</Button>;
      },
    },
  ];

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={employees}
            columns={columns}
            pageSize={5}
            getRowId={(row) => row._id}
          />
        </div>
      </main>

      <div className={classes.form}>
        <Paper elevation={10}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target[0].value);
              axios({
                method: 'post',
                url: '/user/create-user',
                data: JSON.stringify({
                  first_name: e.target[0].value,
                  last_name: e.target[1].value,
                  contact_number: e.target[2].value,
                  emergency: { contact_number: '789', person: 'Stacy' },
                  address: { location: '608693a4d5343234cc9763f6' },
                }),
                headers: { 'content-type': 'application/json' },
              }).catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);

                  enqueueSnackbar(
                    `Error ${error.response.status}: ${error.response.data}`
                  );
                } else if (error.request) {
                  console.log(error.request);
                } else {
                  console.log('Error', error.message);
                }
              });
              setFetch(true);
            }}
          >
            {formfields.slice(0, 3).map((e) => {
              console.log(e);
              return (
                <div>
                  {e.map((i) => (
                    <TextField
                      id={i.id}
                      name={i.id}
                      label={i.label}
                      size="small"
                      required={true}
                    />
                  ))}
                  <Divider />
                  <br />
                </div>
              );
            })}

            <TextField
              id="eperson"
              name="eperson"
              label="Emergency Contact Person"
              style={{ width: 300 }}
              size="small"
              required={true}
            />
            <Divider />
            <br />
            {formfields[3].map((i) => (
              <TextField
                id={i.id}
                name={i.id}
                label={i.label}
                size="small"
                required={true}
              />
            ))}
            <Divider />
            <br />
            <Button type="submit">Add</Button>
            <Button>test</Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}

const formfields = [
  [
    { id: 'fname', label: 'First Name' },
    { id: 'lname', label: 'Last Name' },
    { id: 'job', label: 'Job' },
  ],
  [
    { id: 'address', label: 'Address' },
    { id: 'cnumber', label: 'Contact Number' },
  ],
  [{ id: 'enumber', label: 'Emergency Number' }],
  [
    { id: 'project', label: 'Project' },
    { id: 'sss', label: 'SSS' },
    { id: 'philhealth', label: 'PhilHealth' },
    { id: 'pagibig', label: 'Pag-Ibig' },
  ],
];

export default App;
