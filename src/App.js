// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LetterPage from './pages/LetterPage';


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/letter/:id" element={<LetterPage />} />
      </Routes>
    </Router>
  );
}
