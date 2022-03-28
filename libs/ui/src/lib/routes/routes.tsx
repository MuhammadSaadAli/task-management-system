import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forms from '../forms/forms';
import GetTask from '../todos/getTask';
import Tasks from '../todos/tasks';
import {
  ProtectedRoutesForDashboard,
  ProtectedRoutesForForms,
  ProtectedRoutesForGetTask,
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
        <Route element={<ProtectedRoutesForGetTask />}>
          <Route path="/getTask" element={<GetTask />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
