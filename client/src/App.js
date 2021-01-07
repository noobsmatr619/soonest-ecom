import React, { useContext, useEffect } from "react";
import ECommerce from "./EComerce";
import { toast } from "react-toastify";
import AppContext from "./Context/AppContext";
import io from "socket.io-client";
import { APIs } from "./constraint/API";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
let socket = io.connect(APIs);
socket.on("notificaton", id => {
  toast.info("Some Recently purchased A Product!!");
});
const App = () => {
  let a = [];

  return (
    <Router>
      <Switch>
        <Route path='/'>
          <ECommerce socket={socket} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
