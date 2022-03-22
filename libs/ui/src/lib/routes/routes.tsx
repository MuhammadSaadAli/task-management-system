import './routes.module.scss';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Forms from '../forms/forms';
import Todo from '../todos/todos';
import {
  ProtectedRoutesForDashboard,
  ProtectedRoutesForForms,
} from './protectedRoutes';

export function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutesForForms />}>
          <Route path="/" element={<Forms />}></Route>
        </Route>
        <Route element={<ProtectedRoutesForDashboard />}>
          <Route path="/home" element={<Todo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
