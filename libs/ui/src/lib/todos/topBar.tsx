import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import style from './todos.module.scss';

export default function TopBar() {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('credentials');
    setTimeout(() => navigate('/'), 500);
  };

  return (
    <Box
      style={{
        flexGrow: 1,
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'white',
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: 'rgb(25, 118, 210)', color: 'white' }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            // sx={{ flexGrow: 1 }}
            className={style['top-bar-heading']}
          >
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
