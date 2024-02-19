import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/Authentication.css";


const  Authentication= ({onAuthentication})=> {
    const location = useLocation();
    var isUnauthenticated = new URLSearchParams(location.search).get("unauthenticated");
    const [email, setEmail] = useState("");
    const [BadLogin, setBadLogin] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
  
    function validateForm() {
  
      return email.length > 0 && password.length > 0;
  
    }
    // const fetchUsers = async()=>{
    //   const response = await fetch('/api/users')
    //   if(response.ok){
    //     return response
    //   }
    // }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user = { email, password };
      try {
        const response = await fetch('/api/users/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          setBadLogin(false);
          onAuthentication();
          navigate('/db?loginSuccess=true');
        }
        else{
          setBadLogin(true);
        }
      } catch (error) {
        console.error("Authentication error", error);
      }
    }
  
    return (
  
      <div className="Authentication flex flex-col items-center">
        {isUnauthenticated && <h2>You must be logged in to access the database!</h2>}
        <Form className="flex flex-col items-center justify-between"onSubmit={handleSubmit}>
  
          <Form.Group  className="flex flex-col items-center py-4" size="lg" controlId="email">
  
            <Form.Label>Email</Form.Label>
  
            <Form.Control
              className=''
              
              autoFocus
  
              type="email"
  
              value={email}
  
              onChange={(e) => setEmail(e.target.value)}
  
            />
  
          </Form.Group>
  
          <Form.Group className="flex flex-col items-center py-4" size="lg" controlId="password">
  
            <Form.Label>Password</Form.Label>
  
            <Form.Control
  
              type="password"
  
              value={password}
  
              onChange={(e) => setPassword(e.target.value)}
  
            />
            {BadLogin && <div>Incorrect Credentials!</div>}
          </Form.Group>
  
          <Button className="text-white bg-rose-500 px-2 py-1 rounded-full" block size="lg" type="submit" disabled={!validateForm()}>
  
            Log In!
  
          </Button>
  
        </Form>
  
      </div>
  
    );
  
  }
  export default Authentication;