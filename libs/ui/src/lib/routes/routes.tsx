import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forms from '../forms/forms';
import TaskDetails from '../todos/taskDetails';
import Tasks from '../todos/tasks';
import Error from './Error';
import {
  ProtectedRoutesForDashboard,
  ProtectedRoutesForForms,
  ProtectedRoutesForTaskDetails,
} from './protectedRoutes';

export function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutesForForms />}>
          <Route path="/" element={<Forms />}></Route>
        </Route>
        <Route element={<ProtectedRoutesForDashboard />}>
          <Route path="/home" element={<Tasks />}></Route>
        </Route>
        <Route element={<ProtectedRoutesForTaskDetails />}>
          <Route path="/home/:id" element={<TaskDetails />}></Route>
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
