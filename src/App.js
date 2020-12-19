  
import React, { useEffect,useState} from "react";
import './ChatBox.css';
import Header from "./Header";
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home';
import Buy from "./Buy";
import Login from './Login';
import { useStateValue } from "./SessionState";
import UserContext from "./context/UserContext";
import { Helmet } from 'react-helmet'
import Register from './Register';
import ProductShow from './ProductShow';
import Axios from "axios";

import ChatPage from "./ChatPage";
function App() {
  const [userDetails, setUserDetails] = useState({
    secretCode: undefined,
    user: undefined,
  });

  useEffect(() => {
    const userLoggedIn = async () => {
      let secretCode = localStorage.getItem("auth-token");
      if (secretCode === null) {
        localStorage.setItem("auth-token", "");
        secretCode = "";
      }
      const secretCodeRes = await Axios.post(
        "http://localhost:9000/users/validatedToken",
        null,
        { headers: { "x-auth-token": secretCode } }
      );
      if (secretCodeRes.data) {
        const userRes = await Axios.get("http://localhost:9000/users/", {
          headers: { "x-auth-token": secretCode },
        });
        setUserDetails({
          secretCode,
          user: userRes.data,
        });
      }
    };

    userLoggedIn();
  }, []);

  return (
   

    <Router>
    <UserContext.Provider value={{ userDetails, setUserDetails }}>   
    <div className="app">
    <Helmet>
    <title>{ "Soonest"}</title>
   </Helmet>
      <Switch>
      <Route path="/buy">
      <Header />
      <Buy/>
      </Route>
      <Route path="/login">
      
         <Login />
     
      </Route>
      <Route path="/register">
      
      <Register/>
  
      </Route>
      <Route path="/chat">
      
      <ChatPage/>
  
      </Route>
      <Route path="/shop">
      
      <ProductShow/>
  
      </Route>
      <Route path="/">
      <Header />
      <Home/>
      </Route>
      
      </Switch>
    </div>
    </UserContext.Provider>

      </Router>
      
  );
}

export default App;
