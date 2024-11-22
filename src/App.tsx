import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Watch } from './pages/Watch';
import { Tasks } from './pages/Tasks';
import { Support } from './pages/Support';
import { Terms } from './pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-black to-pink-900">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/watch" element={<Watch />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/support" element={<Support />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </div>
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    </BrowserRouter>
  );
}