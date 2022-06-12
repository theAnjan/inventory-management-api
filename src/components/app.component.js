import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouting } from './app.routing';
import { ToastContainer } from 'react-toastify'


// functional component
export const App = (args) => {
  return (
    <div>
      <AppRouting />
      <ToastContainer />

    </div>

  )
}





// components in reactjs
// component is basic building block for reactjs 

// component can be written as 
// class based component
// functional component


// component can be 
// stateless or statefull

// before v16.8 
// class based component for statefull component
// functional component for stateless component

// afte v16.8
// with introduction of hooks
// functional componnet can maintain state


// state and props ==>
// state and props are component's data
// state ==> within a component's data
// props ==> incoming data for a compnent

// role
// component is responsible to provide single html node