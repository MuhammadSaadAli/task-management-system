import { useState, ChangeEvent, forwardRef, ReactElement, Ref } from 'react';
import {
  Button,
  Dialog,
  ListItem,
  List,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Typography,
  ListItemText,
  Paper,
  TextField,
} from '@mui/material';
import swal from 'sweetalert';
import style from './todos.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';

// Dialogue code from here

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(prop: any) {
  const { toggleStatus } = prop;
  const [open, setOpen] = useState(false);
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
      setOpen(false);
      setTask({ title: '', description: '' });
      toggleStatus();
    } else {
      swal({
        icon: 'warning',
        title: 'You can not add empty value',
      });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style['addTask']}>
      <Button
        style={{ color: '#000CA3', fontFamily: 'Helvetica' }}
        className={style['addTaskButton']}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add your task
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{
            backgroundColor: 'rgb(25, 118, 210)',
            color: 'white',
            position: 'relative',
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 3, flex: 1 }} variant="h6" component="div">
              Add Your Task
            </Typography>
          </Toolbar>
        </AppBar>
        <div className={style['container']}>
          <Paper className={style['box-for-addTask']} elevation={3}>
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
          </Paper>
        </div>
      </Dialog>
    </div>
  );
}

// Add Task code from here

type tTask = {
  title: string;
  description: string;
};
// export default function AddTask() {
//   const [task, setTask] = useState<tTask>({
//     title: '',
//     description: '',
//   });

//   const handleChange =
//     (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
//       setTask({ ...task, [prop]: event.target.value });
//     };
//   // oldArray => [ ...oldArray , todo]
//   const addTask = async (): Promise<void> => {
//     if (task.title !== '' && task.description !== '') {
//       const token = localStorage.getItem('credentials');
//       const user = JSON.parse(token ? token : '');
//       const fetchObj = {
//         url: 'http://localhost:3333/api/task',
//         order: {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${user}`,
//           },
//           body: JSON.stringify(task),
//         },
//       };
//       const rawResponse = await fetch(fetchObj.url, fetchObj.order);
//       const content = await rawResponse.json();
//       console.log(content);
//       setTask({ title: '', description: '' });
//     } else {
//       swal({
//         icon: 'warning',
//         title: 'You can not add empty value',
//       });
//     }
//   };
//   return (
//     <div className={style['container']}>
//       <Paper className={style['box']} elevation={3}>
//         <div>
//           <TextField
//             value={task.title}
//             onChange={handleChange('title')}
//             id="standard-basic"
//             label=" Title "
//             variant="standard"
//           />
//           <TextField
//             value={task.description}
//             onChange={handleChange('description')}
//             id="standard-basic"
//             label=" Description "
//             variant="standard"
//           />
//           <Button onClick={addTask} variant="text">
//             Add
//           </Button>
//         </div>
//       </Paper>
//     </div>
//   );
// }
