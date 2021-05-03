import {
  TextField,
  Button,
  Divider,
  Paper,
  TextareaAutosize,
} from '@material-ui/core';
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
import Alert from './components/Alert';
import axios from 'axios';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column-reverse',
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
      display: 'flex',
      padding: theme.spacing(3),
      '& .MuiPaper-root': { padding: theme.spacing(1) },
      '& > div': { padding: '0 5px' },
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    Icon: {
      color: 'white',
    },
    formname: { lineHeight: '3', paddingLeft: '12px' },
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
      const data = axios.get('/user/fetch-user').then((res) => {
        setEmployees(res.data);
        console.log(res.data);
      });
      const location = axios.get('');
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

  const renderTextField = (i, width) => (
    <TextField
      id={i.id}
      name={i.id}
      label={i.label}
      size="small"
      required={true}
      variant="outlined"
      style={{ width: `${width}` }}
    />
  );

  const columns = [
    { field: '_id', headerName: 'ID', width: 250, hide: true },
    { field: 'first_name', headerName: 'First name', width: 250 },
    { field: 'last_name', headerName: 'Last name', width: 250 },
    { field: 'job', headerName: 'Job', width: 150 },
    {
      field: '',
      headerName: 'Delete',
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

        return <Button onClick={onClick}>x</Button>;
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

      <Paper elevation={10}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            console.log('e', e);
            axios({
              method: 'post',
              url: '/user/create-user',
              data: JSON.stringify({
                first_name: e.target[0].value,
                last_name: e.target[2].value,
                contact_number: e.target[6].value,
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
          <div>
            <div className={classes.formname}>Personal Info </div>
            {formfields[0].map((i) => renderTextField(i, '50%'))}
            <br />
            {formfields[1].map((i) => renderTextField(i, '100%'))}
            <br />
            {formfields[2].map((i) => renderTextField(i, '50%'))}
          </div>
          <div>
            <div className={classes.formname}>Emergency Info</div>
            {formfields[3].map((i) => renderTextField(i, '50%'))}
            <br />
            <div className={classes.formname}>Salary Deductions</div>
            {formfields[4].map((i) => renderTextField(i, '33%'))}
          </div>
          <div>
            <div className={classes.formname}>Remarks</div>
            {formfields[5].map((i) => (
              <TextareaAutosize
                id={i.id}
                rowsMin={5}
                placeholder="Minimum 3 rows"
                style={{ width: '300px', borderColor: 'rgba(0,0,0,0.25)' }}
              />
            ))}
            <br />
            <Button type="submit">Add</Button>
            <Button>test</Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

const formfields = [
  [
    { id: 'fname', label: 'First Name' },
    { id: 'lname', label: 'Last Name' },
  ],
  [{ id: 'address', label: 'Address' }],
  [
    { id: 'cnumber', label: 'Contact Num.' },
    { id: 'job', label: 'Job' },
  ],
  [
    { id: 'enumber', label: 'Emergency Number' },
    { id: 'eperson', label: 'Person to Contact' },
  ],
  [
    { id: 'sss', label: 'SSS' },
    { id: 'philhealth', label: 'PhilHealth' },
    { id: 'pagibig', label: 'Pag-Ibig' },
  ],
  [{ id: 'remarks', label: 'Remarks' }],
];

export default App;
