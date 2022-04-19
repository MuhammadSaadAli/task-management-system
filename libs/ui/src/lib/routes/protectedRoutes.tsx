import { Outlet } from 'react-router-dom';
import Forms from '../forms/forms';
import Tasks from '../todos/tasks';
import TaskDetails from '../todos/taskDetails';
function ProtectedRoutesForDashboard() {
  return localStorage.getItem('credentials') ? <Outlet /> : <Forms />;
}

function ProtectedRoutesForForms() {
  const user = localStorage.getItem('credentials');
  return !user ? <Outlet /> : <Tasks />;
}

function ProtectedRoutesForTaskDetails() {
  const user = localStorage.getItem('credentials');
  return !user ? <Outlet /> : <TaskDetails />;
}
export {
  ProtectedRoutesForDashboard,
  ProtectedRoutesForForms,
  ProtectedRoutesForTaskDetails,
};
