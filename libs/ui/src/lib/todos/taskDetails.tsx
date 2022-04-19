import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './todos.module.scss';
import TopBar from './topBar';
type iTasks = {
  id: string;
  title: string;
  description: string;
  status: string;
};
function TaskDetails() {
  const [tasks, setTasks] = useState<iTasks>();
  const { id } = useParams();
  // const id = params['id'];
  const token = localStorage.getItem('credentials');
  const user = JSON.parse(token ? token : '');

  useEffect(() => {
    const fetchObj = {
      url: `http://localhost:3333/api/task/${id}`,
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
    fetchApi();
  }, []);
  console.log(tasks);
  return (
    <>
      <TopBar />
      <div className={style['taskDetails']}>
        <div>
          <h1>{tasks?.title}</h1>
          <p>{tasks?.description}</p>
        </div>
      </div>
    </>
  );
}

export default TaskDetails;
