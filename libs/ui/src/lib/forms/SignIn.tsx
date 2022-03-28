import { useState, ChangeEvent, MouseEvent } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  Button,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import './forms.css';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

type tValue = {
  username: string;
  password: string;
};

export default function SignIn() {
  const [values, setValues] = useState<tValue>({
    username: 'saad',
    password: 'Secret@1',
  });
  const url = 'http://localhost:3333/api/auth/signin';
  const navigate = useNavigate();

  const getData = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const content = await rawResponse.json();
    if (content.accessToken) {
      console.log(content.accessToken);
      localStorage.setItem('credentials', JSON.stringify(content.accessToken));
      setTimeout(() => navigate('/home'), 500);
    } else {
      swal(` Error ${content.statusCode} ${content.message}`, '', 'error');
    }
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form>
        <FormControl className="formControl" variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Username
          </InputLabel>
          <Input
            id="standard-adornment-email"
            value={values.username}
            onChange={handleChange('username')}
          />
        </FormControl>
        <FormControl variant="standard" className="formControl">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={getData} className="formControl" variant="contained">
          {' '}
          Sign In{' '}
        </Button>
      </form>
    </div>
  );
}
