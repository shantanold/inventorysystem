import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/Authentication.css";


const  Authentication= ({onAuthentication})=> {

    const [email, setEmail] = useState("");
  
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
    const handleSubmit = async (e)=>{
      e.preventDefault()
      const user = {email, password}
      try{
        const response = await fetch('/api/users/authenticate',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({email,password})
        })
        if(response.ok){
          console.log(response, " is the response fam...")
          onAuthentication()
        }
      }
      catch(error){
        console.error("Authentication error",error)
      }
      
    }
  
    return (
  
      <div className="Authentication">
  
        <Form onSubmit={handleSubmit}>
  
          <Form.Group size="lg" controlId="email">
  
            <Form.Label>Email</Form.Label>
  
            <Form.Control
  
              autoFocus
  
              type="email"
  
              value={email}
  
              onChange={(e) => setEmail(e.target.value)}
  
            />
  
          </Form.Group>
  
          <Form.Group size="lg" controlId="password">
  
            <Form.Label>Password</Form.Label>
  
            <Form.Control
  
              type="password"
  
              value={password}
  
              onChange={(e) => setPassword(e.target.value)}
  
            />
  
          </Form.Group>
  
          <Button className="bg-slate-800" block size="lg" type="submit" disabled={!validateForm()}>
  
            Log In!
  
          </Button>
  
        </Form>
  
      </div>
  
    );
  
  }
  export default Authentication;