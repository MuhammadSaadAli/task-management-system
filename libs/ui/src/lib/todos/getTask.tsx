import { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import style from './todos.module.scss';
import TopBar from './topBar';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type ICProps = {
  status: string;
  id: string;
};

function CustomSelect(props: ICProps) {
  const { status, id } = props;
  const [value, setValue] = useState(status);
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    const token = localStorage.getItem('credentials');
    const user = JSON.parse(token ? token : '');
    console.log('user : ', user);
    const fetchObj = {
      url: `http://localhost:3333/api/task/${id}/status`,
      order: {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify(value),
      },
    };
    const updateStatus = async () => {
      const rawResponse = await fetch(fetchObj.url, fetchObj.order);
      const content = await rawResponse.json();
      console.log(content);
    };
    updateStatus();
  }, [value]);
  return (
    <Box sx={{ minWidth: 120 }}>
      Status
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          {' '}
          {value === '' ? status : ''}{' '}
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          placeholder={status}
        >
          <MenuItem value="OPEN">OPEN</MenuItem>
          <MenuItem value="IN_PROGRESS">IN_PROGRESS</MenuItem>
          <MenuItem value="DONE">DONE</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
export default function GetTask() {
  const [tasks, setTasks] = useState([
    {
      id: '',
      title: '',
      description: '',
      status: '',
    },
  ]);

  const token = localStorage.getItem('credentials');
  const user = JSON.parse(token ? token : '');

  useEffect(() => {
    const fetchObj = {
      url: 'http://localhost:3333/api/task',
      order: {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
      },
    };
    const fetchApi = async () => {
      const rawResponse = await fetch(fetchObj.url, fetchObj.order);
      const response = await rawResponse.json();
      console.log(response);
      setTasks(response);
    };
    fetchApi();
  }, []);

  const deletePost = async (id: string) => {
    const fetchObj = {
      url: `http://localhost:3333/api/task/${id}`,
      order: {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user}`,
        },
      },
    };
    await fetch(fetchObj.url, fetchObj.order);
  };

  return (
    <>
      <TopBar />

      <div className={style['getTask']}>
        {tasks.map((task) => {
          return (
            <Paper className={style['paper']} key={task.id}>
              <h1> {task.title} </h1>
              <p> {task.description} </p>
              <div className={style['select']}>
                {' '}
                <div>
                  <CustomSelect id={task.id} status={task.status} />{' '}
                </div>
                <Button onClick={() => deletePost(task.id)}>
                  {' '}
                  <DeleteOutlineIcon color="error" />{' '}
                </Button>
              </div>
            </Paper>
          );
        })}
      </div>
    </>
  );
}
