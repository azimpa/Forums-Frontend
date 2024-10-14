import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import ThreadList from './components/ThreadList';
import ThreadDetail from './components/ThreadDetail';
import CreateThread from './components/CreateThread';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category/:id" element={<ThreadList />} />
          <Route path="/thread/:id" element={<ThreadDetail />} />
          <Route path="/create-thread" element={<CreateThread />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
