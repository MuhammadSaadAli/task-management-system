import { useState, Fragment, KeyboardEvent, MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  links: {
    color: '#454475',
    textDecoration: 'none',
  },
});

type Anchor = 'left';
export default function TopBar() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'left',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button>
          <Link className={classes.links} to="/home">
            <ListItemText primary="Add Task" />
          </Link>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <Link to="/getTask" className={classes.links}>
            <ListItemText primary="Get task" />
          </Link>
        </ListItem>
      </List>
    </div>
  );
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('credentials');
    setTimeout(() => navigate('/'), 500);
  };
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#1976d2' }}>
      <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
        <Toolbar>
          <Fragment>
            <IconButton
              onClick={toggleDrawer('left', true)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor={'left'}
              open={state.left}
              onClose={toggleDrawer('left', false)}
            >
              {list('left')}
            </Drawer>
          </Fragment>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to your Task Management system!
          </Typography>
          <Button onClick={logOut} color="inherit">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
