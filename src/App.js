
import './App.css';
import Header from "./Header";
import { BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Home from './Home';
import Buy from "./Buy";
function App() {
  return (
    <Router>
    <div className="app">
    <Header />
      <Switch>
      <Route path="/buy">
      <Buy/>
      </Route>

      <Route path="/">
    
      <Home/>
      </Route>
      </Switch>
    </div>
      </Router>
      
  );
}

export default App;
