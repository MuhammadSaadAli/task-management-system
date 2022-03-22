import { Button } from '@mui/material';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import './forms.css';

export default function Forms() {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <div className="formContainer">
      <div className="container">
        <div className="formSec">
          <div className="form">{toggle ? <SignIn /> : <SignUp />}</div>
          {toggle ? (
            <Button onClick={() => setToggle(!toggle)}>
              {' '}
              Click here to SignUp{' '}
            </Button>
          ) : (
            <Button onClick={() => setToggle(!toggle)}>
              {' '}
              Already have an account ? SignIn{' '}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

/*

import './forms.module.scss';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import { FormControl, InputLabel } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Button from '@mui/material/Button';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

type authType = {
  email: string;
  password: string;
  showPassword?: boolean;
};

export function Forms() {
  const [values, setValues] = useState<authType>({
    email: '',
    password: '',
    showPassword: false,
  });

  // const [credential, setcredential] = useState<authType>({
  //   email: '',
  //   password: '',
  // });

  const [user, setUser] = useState<any>();
  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  const navigate = useNavigate();
  const onSubmitValues = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      localStorage.setItem('credentials', JSON.stringify(user));
      setTimeout(() => navigate('/home'), 500);
    } catch (error: any) {
      console.log(error.message);
      swal({
        icon: 'error',
        title: error.message,
      });
    }
  };

  const handleChange = (prop: string) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const styles = {
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      width: '30%',
      m: 1,
      padding: '2vh 5vw 2vh 5vw',
      background: '#DAF1F2',
    },
    box: {},
  };

  return (
    // localStorage.getItem('credentials') ? navigate("/home") :
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper sx={styles.paper} elevation={3}>
        <HowToRegIcon
          fontSize="large"
          sx={{ marginRight: '50%', marginLeft: '50%', marginBottom: '5vh' }}
        />
        <TextField
          id="standard-basic"
          label="Email"
          variant="standard"
          onChange={handleChange('email')}
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={onSubmitValues} size="large">
          Sign In
        </Button>
      </Paper>
    </Box>
  );
}

export default Forms;
*/
