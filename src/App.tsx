import {
  Typography,
  Button,
  Drawer,
  IconButton,
  CssBaseline,
  AppBar,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import clsx from 'clsx';
import React from 'react';
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from '@material-ui/core/styles';
import './App.css';
import Employees from './Employees';
import Locations from './Locations';
import Home from './Home';
import Route from './components/Route';

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
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
      marginTop: theme.spacing(8),
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
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Icon style={{ color: '#fff' }}>menu_open</Icon>
          </IconButton>
          <Typography variant="h6" noWrap style={{ flexGrow: 1 }}>
            Welcome, Bryan!
          </Typography>

          <Button>
            <Icon>settings</Icon>
          </Button>
          <Button>
            <Icon>help</Icon>
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        transitionDuration={{ enter: 500, exit: 1000 }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <Icon style={{ color: '#fff' }}>cancel</Icon>
          </IconButton>
        </div>
        <Divider />
        <List>
          {sidemenu[0].map((i) => (
            <a href={i[2]} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItem button>
                <ListItemIcon>
                  <Icon style={{ color: '#fff' }}>{i[0]}</Icon>
                </ListItemIcon>
                <ListItemText primary={i[1]} />
              </ListItem>
            </a>
          ))}
        </List>
        <Divider />
        <List>
          {sidemenu[1].map((i) => (
            <ListItem button>
              <ListItemIcon>
                <Icon style={{ color: '#fff' }}>{i[0]}</Icon>
              </ListItemIcon>
              <ListItemText primary={i[1]} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <main className={classes.content}>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route path="/locations">
          <Locations />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </main>
    </div>
  );
}

const sidemenu = [
  [
    ['home', 'Home', '/'],
    ['groups', 'Employees', '/employees'],
    ['explore', 'Locations', '/locations'],
    ['apartment', 'Projects', '/projects'],
  ],
  [
    ['event_available', 'Pay Runs'],
    ['how_to_reg', 'Approvals'],
    ['summarize', 'Reports'],
  ],
];

export default App;
