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
// import swal from 'sweetalert';
import './forms.css';

type tValue = {
  username: string;
  password: string;
};

export default function SignUp() {
  const [values, setValues] = useState<tValue>({
    username: 'saad',
    password: 'Secret@1',
  });
  const url = 'http://localhost:3333/api/auth/signup';

  const getData = async () => {
    const rawResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(values),
    });

    const content = await rawResponse.json();

    // setToken(data);
    if (content.statusCode !== 201) {
      console.log('data : ', content.message);
    } else {
      console.log('data success : ', content.statusCode);
    }

    // .then((response) => {
    //   console.log('response.json() ', response.json());
    //   return response.json();
    // })
    // .then((data) => {
    //   setStatusCode(data.statusCode);
    //   if (statusCode !== 201) {
    //     console.log('Data Message ', data.message);
    //   } else {
    //     console.log(data);
    //   }
    // })
    // .catch((error) => console.log(error));
    // setToken(rawResponse);
    // console.log('response', rawResponse);
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
          Sign Up{' '}
        </Button>
      </form>
    </div>
  );
}
