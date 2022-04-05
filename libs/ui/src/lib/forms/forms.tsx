import { Button } from '@mui/material';
import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import TopBar from './topBar';
import './forms.css';

export default function Forms() {
  const [toggle, setToggle] = useState<boolean>(true);
  const switchToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <TopBar />
      <div className="formContainer">
        <div className="container">
          <div className="formSec">
            <div className="form">{toggle ? <SignIn /> : <SignUp />}</div>
            {toggle ? (
              <Button onClick={switchToggle}> Click here to SignUp </Button>
            ) : (
              <Button onClick={switchToggle}>
                {' '}
                Already have an account ? SignIn{' '}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
