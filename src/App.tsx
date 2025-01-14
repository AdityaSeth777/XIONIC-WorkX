import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AbstraxionProvider } from '@burnt-labs/abstraxion';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { CreateProject } from './pages/CreateProject';
import { Profile } from './pages/Profile';
import { AuthProvider } from './context/WalletContext';
import { CustomCursor } from './components/CustomCursor';
import { Preloader } from './components/Preloader';

const abstraxionConfig = {
  chainId: import.meta.env.VITE_XION_CHAIN_ID,
  rpcUrl: import.meta.env.VITE_XION_RPC_URL,
  restUrl: import.meta.env.VITE_XION_REST_URL,
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <AbstraxionProvider config={abstraxionConfig}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 text-white">
            <CustomCursor />
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/create-project" element={<CreateProject />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </AbstraxionProvider>
  );
}