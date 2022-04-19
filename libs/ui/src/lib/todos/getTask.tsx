import { useState, useEffect } from 'react';
import { Paper, Button } from '@material-ui/core';
import style from './todos.module.scss';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import {
  Dialog,
  FormControl,
  Box,
  MenuItem,
  InputLabel,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
} from '@mui/material';
import AddTask from './addTask';
type ICProps = {
  status: string;
  id: string;
  updateTheStatus: (statusValue: string, id: string) => void;
};

function CustomSelect(props: ICProps) {
  const { status, id, updateTheStatus } = props;
  const [statusValue, setStatusValue] = useState(status);
  const [open, setOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleUpdateStatus = async () => {
    const token = localStorage.getItem('credentials');
    const user = JSON.parse(token ? token : '');
    const fetchObj = {
      url: `http://localhost:3333/api/task/${id}/status`,
      order: {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${user}`,
        },
        body: JSON.stringify({ status: statusValue }),
      },
    };

    const rawResponse = await fetch(fetchObj.url, fetchObj.order).then(
      async () => await updateTheStatus(statusValue, id)
    );

    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <EditIcon color="primary" />
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={() => setOpen(false)}>
        <DialogTitle>You can update the status from here </DialogTitle>
        <DialogContent>
          <Box component="form" style={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 2, minWidth: '80%' }}>
              <InputLabel id="demo-dialog-select-label">Status</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={statusValue}
                onChange={handleChange}
                input={<OutlinedInput label="Status" id="demo-dialog-native" />}
              >
                <MenuItem value="OPEN"> OPEN </MenuItem>
                <MenuItem value="IN_PROGRESS"> IN_PROGRESS </MenuItem>
                <MenuItem value="DONE"> DONE </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateStatus}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default function GetTask() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [status, setStatus] = useState<boolean>(true);

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
      setTasks(response);
    };
    console.log(status);
    fetchApi();
  }, [status]);

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
    await fetch(fetchObj.url, fetchObj.order).then(() => {
      setTasks((old) => {
        old = old.filter((x) => x.id !== id);
        return old;
      });
    });
  };

  const updateTheStatus = (statusValue: string, id: string): void => {
    const findTask = tasks.find((task) => task.id === id);
    const val = (findTask.status = statusValue);
    console.log('val ', val);
    console.log('find Task ', findTask);
    setTasks([...tasks, val]);
    setStatus(!status);
    console.log(tasks);
  };
  return (
    <>
      <AddTask toggleStatus={() => setStatus(!status)} />
      <div className={style['allTasks']}>
        <div className={style['getTask']}>
          {tasks.length ? (
            tasks.map((task) => {
              return (
                <Paper
                  className={style['paper']}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: 'rgb(174 217 253)',
                  }}
                  key={task.id}
                >
                  <div>
                    <Link
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      to={`/home/${task.id}`}
                    >
                      <h1> {task.title} </h1>
                      {task?.description?.length >= 250 ? (
                        <p> {task.description.substr(0, 250)}....... </p>
                      ) : (
                        <p> {task.description} </p>
                      )}
                    </Link>
                  </div>
                  <div>
                    <div className={style['select']}>
                      {' '}
                      <div>Status: {task.status} </div>
                      <div className={style['status-icon']}>
                        <div>
                          <CustomSelect
                            updateTheStatus={(statusValue, id) =>
                              updateTheStatus(statusValue, id)
                            }
                            id={task.id}
                            status={task.status}
                          />{' '}
                        </div>
                        <div>
                          <Button onClick={() => deletePost(task.id)}>
                            {' '}
                            <DeleteOutlineIcon color="error" />{' '}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              );
            })
          ) : (
            <h1>We do not have any task right now.</h1>
          )}
        </div>
      </div>
    </>
  );
}
