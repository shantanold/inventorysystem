import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    if (storedAuthStatus) {
      setIsAuthenticated(JSON.parse(storedAuthStatus));
    }
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    
  };

  const logOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} logOut={setIsAuthenticated} />
        <div className="pages">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/login"
              element={<Authentication onAuthentication={handleAuthentication} />}
            />
            <Route
              path="/db"
              element={
                isAuthenticated ? (
                  <Home />
                ) : (
                  <Navigate to="/login?unauthenticated=true" />
                )
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
