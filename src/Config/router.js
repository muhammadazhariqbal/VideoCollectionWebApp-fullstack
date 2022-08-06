import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
// import your route components too
import { RegisterPage,SignInPage, UploadVideoPage, DashboardPage,VideoListPage} from '../Pages';
const Navigation = ({user}) => {
console.log(`user in route==> ${user}`)
  return <BrowserRouter>
    <Routes>
      <Route path="/"  element={user ? <Navigate to="/dashboard" replace />  : <SignInPage />}></Route>
      <Route path="/register-tenant"  element={user ? <Navigate to="/dashboard" replace /> : <RegisterPage /> }></Route>
      <Route path="/dashboard"  exact element={user ? <DashboardPage user={user}/> : <Navigate to="/" replace /> }></Route>
      <Route path="/upload-video/:id"  element={ <UploadVideoPage />}></Route>
      <Route path="/video-listing/:id"  element={ <VideoListPage user={user}/>}></Route>
      

    </Routes>
  </BrowserRouter>

  
};

export default Navigation;