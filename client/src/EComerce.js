import React, { useEffect, useContext } from "react";
// import "./ChatBox.css";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Buy from "./components/Buy/Buy";
import Login from "./components/Login/Login";
import LoginAsAdmin from "./components/LoginAsAdmin/LoginAsAdmin";

import { Helmet } from "react-helmet";
import Register from "./components/Register/Register";
import ProductShow from "./components/ProductShow/ProductShow";
import AddProduct from "./components/AddProducts/AddProduct";
import AddedProduct from "./components/AddedProduct/AddedProduct";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import BlogShow from "./components/BlogShow/BlogShow";
import ClientBlog from "./components/ClientBlog/ClientBlog";
import Addblog from "./components/AddBlog/Addblog";
import UpdateBlog from "./components/UpdateBlog/UpdateBlog";
import AddAdmin from "./components/AddAdmin/AddAdmin";
import ParticipantPanel from "./components/ChatApp/Components/ParticipantPanel/ParticipantPanel";
import ResetPassword from "./components/Reset/Reset";
import NewPassword from "./components/NewPassword/NewPassword";
import BoughtProduct from "./components/BroughtProduct/BoughtProduct";

import Wishlist from "./components/WishList/WishList";
import AllOrder from "./components/AllOrder/AllOrder";
import ChatPage from "./components/ChatApp/ChatApp";
import Blog from "./components/Blog/Blog";

import AppContext from "./Context/AppContext";
import setAuthToken from "./util/setAuthToken";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App({ history2 }) {
  let appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      appcontext.isAuthenticated &&
      appcontext.user &&
      !appcontext.user.admin
    ) {
      // appcontext.getAuthBasket();
    } else {
      appcontext.getBasket();
    }
  }, []);
  return (
    <Router>
      <div className={`app ${appcontext.mode ? "light-mode" : "dark-mode"}`}>
        <Helmet>
          <title>{"Soonest"}</title>
        </Helmet>

        <Header />

        <Switch>
          <React.Fragment>
            <Route exact path='/buy' component={Buy} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/admin' component={LoginAsAdmin} />
            <Route exact path='/admin/addadmin' component={AddAdmin} />
            <Route exact path='/admin/addproduct' component={AddProduct} />
            <Route exact path='/admin/addedproduct' component={AddedProduct} />
            <Route exact path='/admin/allorder' component={AllOrder} />
            <Route
              exact
              path='/recentbroughtproduct'
              component={BoughtProduct}
            />
            <Route exact path='/wishlist' component={Wishlist} />
            <Route
              exact
              path='/admin/updateproduct/:id'
              component={UpdateProduct}
            />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <Route exact path='/reset/:token' component={NewPassword} />
            <Route exact path='/admin/addblog' component={Addblog} />
            <Route exact path='/admin/addedblog' component={BlogShow} />
            <Route exact path='/admin/updateblog/:id' component={UpdateBlog} />
            <Route exact path='/register' component={Register} />
            <Route path='/chat'>
              <div className='ChatApp'>
                <div className='ChatAppMainframe'>
                  <Route path='/chat' component={ParticipantPanel} />
                  <Route exact path='/chat/:id' component={ChatPage} />
                </div>
              </div>
            </Route>
            <Route path='/adminchat'>
              <div className='ChatApp'>
                <div className='ChatAppMainframe'>
                  <Route path='/adminchat' component={ParticipantPanel} />
                  <Route exact path='/adminchat/:id' component={ChatPage} />
                </div>
              </div>
            </Route>
            <Route exact path='/shop' component={ProductShow} />
            <Route exact path='/blog' component={ClientBlog} />
            <Route exact path='/' component={Home} />
          </React.Fragment>
        </Switch>
      </div>
    </Router>
  );
}

export default App;