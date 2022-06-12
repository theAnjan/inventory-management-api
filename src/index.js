import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app.component'

const container = document.getElementById('root');

ReactDOM.render(<App phoneNumber="4333" status="online"></App>, container)