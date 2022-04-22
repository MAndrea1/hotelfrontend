import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <Router>
      <Routes>
          <Route path="/*" element={<App/>}/>
      </Routes>
   </Router>
);


