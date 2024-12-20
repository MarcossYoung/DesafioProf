import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './UserProvider';
import App from './app';
import './css/boxes.css';
import './css/normalize.css';
import './css/styles.css';
import './css/styles-lg.css';
import './css/styles-md.css';
import './css/styles-sm.css';
import './css/utils.css';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(  <React.StrictMode>
                    <UserProvider>
                      <App />
                    </UserProvider>
                  </React.StrictMode>,);