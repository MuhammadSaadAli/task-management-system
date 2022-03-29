import { useState, ChangeEvent } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import swal from 'sweetalert';
import style from './todos.module.scss';

type tTask = {
  title: string;
  description: string;
};
export default function AddTask() {
  const [task, setTask] = useState<tTask>({
    title: '',
    description: '',
  });

  const handleChange =
    (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
      setTask({ ...task, [prop]: event.target.value });
    };
  // oldArray => [ ...oldArray , todo]
  const addTask = async (): Promise<void> => {
    if (task.title !== '' && task.description !== '') {
      const token = localStorage.getItem('credentials');
      const user = JSON.parse(token ? token : '');
      const fetchObj = {
        url: 'http://localhost:3333/api/task',
        order: {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify(task),
        },
      };
      const rawResponse = await fetch(fetchObj.url, fetchObj.order);
      const content = await rawResponse.json();
      console.log(content);
      setTask({ title: '', description: '' });
    } else {
      swal({
        icon: 'warning',
        title: 'You can not add empty value',
      });
    }
  };
  return (
    <div className={style['container']}>
      <Paper className={style['box']} elevation={3}>
        <div>
          <TextField
            value={task.title}
            onChange={handleChange('title')}
            id="standard-basic"
            label=" Title "
            variant="standard"
          />
          <TextField
            value={task.description}
            onChange={handleChange('description')}
            id="standard-basic"
            label=" Description "
            variant="standard"
          />
          <Button onClick={addTask} variant="text">
            Add
          </Button>
        </div>
      </Paper>
    </div>
  );
}
