import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
// import your route components too
import { RegisterPage,SignInPage, UploadVideoPage } from '../Pages';
const Navigation = ({authListener}) => {
    
    authListener()
    .then((res)=>{
        console.log(res)
    })
    
    var x = 122;
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInPage />}></Route>
      <Route path="/RegisterTenant" element={<RegisterPage />}></Route>
      <Route path={`/UploadVideo`} element={<UploadVideoPage />}></Route>
    </Routes>
  </BrowserRouter>
};
export default Navigation;