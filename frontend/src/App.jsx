import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import HomePage from './pages/home/HomePage'
import ArticlePage from './pages/article/ArticlePage'

function App() {

  return (
    <Router>
      <div className="App">

        <header className="App-header">
          <h1>Assimetria Blog</h1>
        </header>

        <main className="App-main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </main>

        <footer className="App-footer">
          <p>&copy; 2025 Assimetria Blog</p>
        </footer>

      </div>
    </Router>
  )
}

export default App
