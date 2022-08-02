import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import your route components too
import { RegisterPage,SignInPage, UploadVideoPage, DashboardPage} from '../Pages';
const Navigation = ({user}) => {
  console.log(user)
  return <BrowserRouter>
    <Routes>
      <Route path="/"  element={!user ? <SignInPage /> : <Navigate to="/Dashboard" replace />}></Route>
      <Route path="/register-tenant"  element={!user ? <RegisterPage /> : <Navigate to="/Dashboard" replace />}></Route>
      <Route path="/dashboard"  element={user ? <DashboardPage /> : <Navigate to="/" replace /> }></Route>
      <Route path="/upload-video/:id"  element={ <UploadVideoPage />}></Route>
      

    </Routes>
  </BrowserRouter>

  
};

export default Navigation;