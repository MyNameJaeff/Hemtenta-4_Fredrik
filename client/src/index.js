import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import Sign from './App';
import Admin from './components/admin';
import Book from './components/book';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route absolute path="/" element={<Sign />} />
      <Route path="admin" element={<Admin />} />
      <Route path="book" element={<Book />} />
      <Route path="*" element={<h1>404 Page Not Found! <a href='./'>Go back!</a></h1>} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
