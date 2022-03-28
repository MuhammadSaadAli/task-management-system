import { Outlet } from 'react-router-dom';
import Forms from '../forms/forms';
import Tasks from '../todos/tasks';
import GetTask from '../todos/getTask';
function ProtectedRoutesForDashboard() {
  return localStorage.getItem('credentials') ? <Outlet /> : <Forms />;
}

function ProtectedRoutesForForms() {
  const user = localStorage.getItem('credentials');
  return !user ? <Outlet /> : <Tasks />;
}

function ProtectedRoutesForGetTask() {
  const user = localStorage.getItem('credentials');
  return !user ? <Outlet /> : <GetTask />;
}
export {
  ProtectedRoutesForDashboard,
  ProtectedRoutesForForms,
  ProtectedRoutesForGetTask,
};
