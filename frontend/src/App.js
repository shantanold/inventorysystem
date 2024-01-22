import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Authentication from './pages/Authentication';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(()=>{
    const storedAuthStatus = localStorage.getItem('isAuthenticated')
    if(storedAuthStatus){
      setIsAuthenticated(JSON.parse(storedAuthStatus))
    }
  }, [])
  const handleAuthentication = () =>{
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated',JSON.stringify(true))
    
  }
  const logOut = () =>{
    setIsAuthenticated(false)
  }
  return (
    
    <div className="App">
      <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated}/>
      <div className = 'pages'>
        
          <Routes>
            <Route path='/' element={<LandingPage/>}/>
            <Route path='/login' element={<Authentication onAuthentication={handleAuthentication}/>}/>
            <Route path='/db' element={<Home/>}/>
            
            {/* {isAuthenticated ? (
              <Route
               path='/' element={<Home />}/>
            ) : (
              <Route
              path='/'
              element={<Authentication onAuthentication={handleAuthentication}/>} />
            )} */}
    </Routes>


      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
