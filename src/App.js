  
import React, { useEffect } from "react";
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
  let [{userDetails}, setUserDetails] = useStateValue({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    let existingLog = async () => {
      let secretCode= localStorage.getItem("auth-token");
      if (secretCode === null) {
        localStorage.setItem("auth-token", "");
        secretCode = "";
      }
      let secretCodeResults = await Axios.post(
        "http://localhost:5000/users/validatedToken",
        null,
        { headers: { "x-auth-token": secretCode } }
      );
 //    console.log(secretCode)
    // console.log(secretCode.data)
      if (secretCodeResults.data) {
        let  userBool = await Axios.get("http://localhost:5000/users/", {
          headers: { "x-auth-token": secretCode },
        });
        //console.log(secretCode)
        setUserDetails({
          secretCode,
          user: userBool.data,
        });
     //  console.log(userBool)
      }
    };

    existingLog();
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
