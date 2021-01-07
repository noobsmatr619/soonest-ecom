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
import EditUserDetails from "./components/EditUserDetails.js/EditUserDetails";
import UpdateBlog from "./components/UpdateBlog/UpdateBlog";
import AddAdmin from "./components/AddAdmin/AddAdmin";
import ParticipantPanel from "./components/ChatApp/Components/ParticipantPanel/ParticipantPanel";
import ResetPassword from "./components/Reset/Reset";
import NewPassword from "./components/NewPassword/NewPassword";
import BoughtProduct from "./components/BroughtProduct/BoughtProduct";
import { APIs } from "./constraint/API";
import Wishlist from "./components/WishList/WishList";
import AllOrder from "./components/AllOrder/AllOrder";
import ChatPage from "./components/ChatApp/ChatApp";
import Blog from "./components/Blog/Blog";
import io from "socket.io-client";
import { toast } from "react-toastify";
import AppContext from "./Context/AppContext";
import AdminRoutes from "./routing/AdminRoutes";
import ClientRoutes from "./routing/ClientRoutes";
import BothRoutes from "./routing/BothRoutes";
import setAuthToken from "./util/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App({ socket }) {
  let appcontext = useContext(AppContext);
  useEffect(() => {
    const run = async () => {
      await appcontext.loadUser();
    };
    run();
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
    <div className={`app ${appcontext.mode && "light-mode"}`}>
      <Router>
        <Helmet
          style={[
            {
              cssText: `
              ${!appcontext.mode &&
                `body {
                background-color: #1a1919 !important;
                 color: #999 !important;
              }`
                } 
            
        `,
            },
          ]}
        >
          <title>{"Soonest"}</title>
        </Helmet>

        <Header />

        <Switch>
          <React.Fragment>
            <ClientRoutes exact path='/buy'>
              <Buy socket={socket} />
            </ClientRoutes>
            <Route exact path='/login' component={Login} />
            <BothRoutes exact path='/edituser' component={EditUserDetails} />
            <Route exact path='/admin' component={LoginAsAdmin} />
            <AdminRoutes exact path='/admin/addadmin' component={AddAdmin} />
            <AdminRoutes
              exact
              path='/admin/addproduct'
              component={AddProduct}
            />
            <AdminRoutes
              exact
              path='/admin/addedproduct'
              component={AddedProduct}
            />
            <AdminRoutes exact path='/admin/allorder' component={AllOrder} />
            <ClientRoutes
              exact
              path='/recentbroughtproduct'
              component={BoughtProduct}
            />
            <Route exact path='/wishlist' component={Wishlist} />
            <AdminRoutes
              exact
              path='/admin/updateproduct/:id'
              component={UpdateProduct}
            />
            <Route exact path='/resetpassword' component={ResetPassword} />
            <Route exact path='/reset/:token' component={NewPassword} />
            <AdminRoutes exact path='/admin/addblog' component={Addblog} />
            <AdminRoutes exact path='/admin/addedblog' component={BlogShow} />
            <AdminRoutes
              exact
              path='/admin/updateblog/:id'
              component={UpdateBlog}
            />
            <Route exact path='/register' component={Register} />
            <ClientRoutes path='/chat'>
              <div className='ChatApp'>
                <div className='ChatAppMainframe'>
                  <ClientRoutes path='/chat' component={ParticipantPanel} />
                  <ClientRoutes exact path='/chat/:id' component={ChatPage} />
                </div>
              </div>
            </ClientRoutes>
            <AdminRoutes path='/adminchat'>
              <div className='ChatApp'>
                <div className='ChatAppMainframe'>
                  <AdminRoutes path='/adminchat' component={ParticipantPanel} />
                  <AdminRoutes
                    exact
                    path='/adminchat/:id'
                    component={ChatPage}
                  />
                </div>
              </div>
            </AdminRoutes>
            <Route exact path='/shop' component={ProductShow} />
            <Route exact path='/blog' component={ClientBlog} />
            <Route exact path='/' component={Home} />
          </React.Fragment>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
