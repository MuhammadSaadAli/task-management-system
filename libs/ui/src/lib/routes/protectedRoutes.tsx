import React from 'react';
import {Outlet} from 'react-router-dom';
import Forms from '../forms/forms';
import Todos from '../todos/todos';
;


 function ProtectedRoutesForDashboard() {
    return localStorage.getItem("credentials") ? <Outlet /> :  <Forms />
    
    }

    function ProtectedRoutesForForms(){
        const user = localStorage.getItem("credentials"); 
    return !user ? <Outlet /> :  <Todos />

    }
    export {
        ProtectedRoutesForDashboard,
        ProtectedRoutesForForms
    }