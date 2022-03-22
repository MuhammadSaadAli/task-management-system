import style from './todos.module.scss';
import React, { useState, ChangeEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Paper, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { auth } from '../forms/firebase-config';
import { signOut } from 'firebase/auth';

function ButtonAppBar() {
  const navigate = useNavigate();
  const logOut = async () => {
    await signOut(auth);
    localStorage.removeItem('credentials');
    setTimeout(() => navigate('/'), 500);
    console.log(auth);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome to Todos!
          </Typography>
          <Button onClick={logOut} color="inherit">
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

/* eslint-disable-next-line */
export interface TodosProps {}
//  interface ITodoList {
//    name:string,
//    id:string
//  }

function Todos(props: TodosProps) {
  const [todo, setTodo] = useState<string>();
  const [todoList, setTodoList] = useState<any[]>([]);
  const [toggle, setToggle] = useState(false);
  const [isEditedItem, setIsEditedItem] = useState(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  // oldArray => [ ...oldArray , todo]
  const addTodo = (): void => {
    if (todo !== '') {
      // localStorage.setItem( "TodoList" ,JSON.stringify(todoList))
      if (toggle) {
        setTodoList(
          todoList.map((elem) => {
            if (elem.id === isEditedItem) {
              return { ...elem, name: todo };
            }
            return elem;
          })
        );
        setToggle(false);
        setTodo('');
        setIsEditedItem(null);
      } else {
        setTodoList([
          ...todoList,
          { name: todo, id: new Date().getTime().toString() },
        ]);
        setTodo('');
      }
    } else {
      swal({
        icon: 'warning',
        title: 'You can not add empty value',
      });
    }
  };

  return (
    <>
      <ButtonAppBar />
      <div className={style['container']}>
        <Paper className={style['box']} elevation={3}>
          <div>
            <TextField
              value={todo}
              onChange={handleChange}
              id="standard-basic"
              label=" Add Todo "
              variant="standard"
            />
            {/* {
        !toggle ? <Button onClick={addTodo} variant="text">Add</Button> : <Button onClick={addTodo} variant="text"><EditIcon fontSize='small' /></Button>

      } */}
            <Button onClick={addTodo} variant="text">
              Add
            </Button>
          </div>

          {todoList.map((list: any) => (
            <div key={list.id}>
              {' '}
              <p className={style['lists']}>
                <span> {list.name} </span>
              </p>{' '}
            </div>
          ))}
        </Paper>
      </div>
    </>
  );
}

export default Todos;
