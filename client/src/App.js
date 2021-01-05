import React from "react";
import ECommerce from "./EComerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={ECommerce} />
      </Switch>
    </Router>
  );
};

export default App;
