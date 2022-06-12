// library/packages used ==> react router dom
// v 6 
// in v6 it has major changes incompare to v5
// v 6 (latest ) approach

import React from 'react';
import { BrowserRouter, Routes, Route, useParams, useLocation } from 'react-router-dom'
import { Login } from './auth/login/login.component';
import { Register } from './auth/register/register.component';
import { Header } from './../components/common/header/header.component'


const Home = (props) => {
  console.log('props in home is >>', props)
  return <p>Home Page</p>
}

const Dashboard = (props) => {
  console.log('props in dashboard is >>', props)
  let params = useParams();
  console.log('prams >>', params)
  return <p>Dashboard Page</p>
}

const About = (props) => {
  const loc = useLocation();
  console.log('props in About is >>', loc)
  return <p>About Page</p>
}

const Contact = (props) => {
  console.log('props in Contact is >>', props)
  return <p>Contact Page</p>
}

const Settings = (props) => {
  console.log('props in Settings is >>', props)
  return <p>Settings Page</p>
}

const NotFound = (props) => {
  console.log('props in NotFound is >>', props)
  return (
    <div>
      <p>Not Found</p>
      <img src='./images/notfound.png' width="600px"></img>
    </div>
  )
}
export const AppRouting = () => {

  return (
    <BrowserRouter>
      <Header isLoggedIn={true} />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/settings" element={<Settings />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/dashboard/:name" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )


}

// react-router-dom v6
// BrowserRouter
// Routes
// Route ==> main configuration
// path and element attribute are used

// Link is used to navigate on click event

// important hooks
// useNavigate ==> navigation
// useParams ==> part of url ko value
// useLocation ==> optional url value 

// notfound ko configuration path ='*'