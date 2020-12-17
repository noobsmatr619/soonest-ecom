
import './App.css';
import Header from "./Header";
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home';
import Buy from "./Buy";
import Login from './Login';


import { Helmet } from 'react-helmet'
import Register from './Register';

function App() {
  return (
  

    <Router>
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

      <Route path="/">
      <Header />
      <Home/>
      </Route>
      </Switch>
    </div>
      </Router>
      
  );
}

export default App;
