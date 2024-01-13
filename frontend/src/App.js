import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState } from 'react';
//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = () =>{
    setIsAuthenticated(true)
  }
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <div className = 'pages'>
          <Routes>
            {isAuthenticated ? (
              <Route className="success" path='/' element={<Home />} />
            ) : (
              <Route className="not-quite-yet" path='/' element={<Authentication />} />
            )}
    </Routes>


      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
