
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";


function App() {
  
  const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    // User Login info
    const database = [
      {
        username: "user1",
        password: "pass1"
      },
      {
        username: "user2",
        password: "pass2"
      }
    ];
  
    const errors = {
      uname: "invalid username",
      pass: "invalid password"
    };
  
    const handleSubmit = (event) => {
      //Prevent from page reload
      event.preventDefault();
  
      var { uname, pass } = document.forms[0];
  
      
      const userData = database.find((user) => user.username === uname.value);
  
      
      if (userData) {
        if (userData.password === pass.value) {
            setIsSubmitted(true);
          
        } else {
            setErrorMessages({ name: "pass", message: errors.pass });
          
        }
      } else {
        
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    };
  
    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
      name === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
      );
  
    // JSX code for login form
    const renderForm = (
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {renderErrorMessage("pass")}
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    );

    
    return (
      <div className="app">
        <div className="login-form">
          {isSubmitted ? <div >
            <Router>
      <nav className="link"> 
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/profile"> Profile </Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/:username" element={<Profile />} /> 
      </Routes>
      
    </Router>
          </div> : renderForm}
        </div>
      </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
