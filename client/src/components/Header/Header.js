import React, { useState, useContext } from "react";
import "./Header.css";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

import SearchIcon from "@material-ui/icons/Search";
import { SidebarData } from "../SliderData/SidebarData";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import SendIcon from "@material-ui/icons/Send";
import StoreIcon from "@material-ui/icons/Store";
import HomeIcon from "@material-ui/icons/Home";
import BookIcon from "@material-ui/icons/Book";
import AuthOptions from "../Auth/authentication";
import AppContext from "../../Context/AppContext";
function Header() {
  let appcontext = useContext(AppContext);
  let [sidebarHandler, SidebarState] = useState(false);
  let slideSidebar = () => SidebarState(!sidebarHandler);
  return (
    <div className='header'>
      <div className='menuIcon'>
        {" "}
        {/* collapsing menu */}
        <IconButton className='CollapsibleMenu' onClick={slideSidebar}>
          <MenuIcon />
        </IconButton>
        <nav className={sidebarHandler ? "nav-menu showing" : "nav-menu"}>
          <ul className='navMenuList' onClick={slideSidebar}>
            <li className='navbar-toggle'>
              <IconButton>
                <CloseIcon className='menuClosIcon' />
              </IconButton>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      <Link to='/'>
        <img className='headerLogo' src='/Image/logo.png' alt='#' />
      </Link>
      {appcontext.isAuthenticated &&
      appcontext.user &&
      appcontext.user.admin ? (
        <div className='headerLeftNav'>
          {/* header option */}
          <div className='headerLeftOpt'>
            <span style={{ cursor: "pointer" }} className='headerOptLineOne'>
              {" "}
              <Link to='/' className='homestyle'>
                {" "}
                <HomeIcon />{" "}
              </Link>
            </span>{" "}
            <br />
            <Link to='/' className='iconStyle'>
              {" "}
              <span className='headerOptLineTwo'>Home</span>{" "}
            </Link>
          </div>

          <div style={{ cursor: "pointer" }} className='headerLeftOpt'>
            <Link to='/admin/addproduct' className='iconStyle'>
              <span className='headerOptLineOne'>
                {" "}
                <StoreIcon />{" "}
              </span>{" "}
              <br />
              <span className='headerOptLineTwo'>Add Product </span>
            </Link>
          </div>
          <div style={{ cursor: "pointer" }} className='headerLeftOpt'>
            <Link to='/admin/addedproduct' className='iconStyle'>
              <span className='headerOptLineOne'>
                {" "}
                <StoreIcon />{" "}
              </span>{" "}
              <br />
              <span className='headerOptLineTwo'>Added Product </span>
            </Link>
          </div>
          <div style={{ cursor: "pointer" }} className='headerLeftOpt  '>
            <Link to='/admin/addblog' className='iconStyle'>
              {" "}
              <span className='headerOptTLineOne'>
                <BookIcon />
              </span>
              <br />
              <span className='headerOptLineTwo'> Create Blog</span>{" "}
            </Link>
          </div>
          <div style={{ cursor: "pointer" }} className='headerLeftOpt'>
            <Link to='/admin/addedblog' className='iconStyle'>
              <span className='headerOptLineOne'>
                {" "}
                <StoreIcon />{" "}
              </span>{" "}
              <br />
              <span className='headerOptLineTwo'>Added Blog </span>
            </Link>
          </div>
          <div style={{ cursor: "pointer" }} className='headerLeftOpt'>
            <Link to='/admin/addadmin' className='iconStyle'>
              <span className='headerOptLineOne'>
                {" "}
                <StoreIcon />{" "}
              </span>{" "}
              <br />
              <span className='headerOptLineTwo'>Add Admin </span>
            </Link>
          </div>
        </div>
      ) : (
        <div className='headerLeftNav'>
          {/* header option */}
          <div className='headerLeftOpt'>
            <span className='headerOptLineOne'>
              {" "}
              <Link to='/' className='homestyle'>
                {" "}
                <HomeIcon />{" "}
              </Link>
            </span>{" "}
            <br />
            <Link to='/' className='iconStyle'>
              {" "}
              <span className='headerOptLineTwo'>Home</span>{" "}
            </Link>
          </div>

          <div className='headerLeftOpt'>
            <Link to='/shop'>
              <span className='headerOptLineOne'>
                {" "}
                <StoreIcon />{" "}
              </span>{" "}
              <br />
              <span className='headerOptLineTwo'>Shop </span>
            </Link>
          </div>
          <div className='headerLeftOpt  '>
            <Link to='/blog' className='iconStyle'>
              {" "}
              <span className='headerOptTLineOne'>
                <BookIcon />
              </span>
              <br />
              <span className='headerOptLineTwo'> Blog</span>{" "}
            </Link>
          </div>
        </div>
      )}
      {appcontext.isAuthenticated && appcontext.user && !appcontext.user.admin && (
        <div className='headerSearch'>
          <SearchIcon className='headerSearchIcon' />
          <input
            className='headerSearchInput'
            type='text'
            placeholder='Search Anything'
          />
        </div>
      )}

      {appcontext.isAuthenticated &&
      appcontext.user &&
      appcontext.user.admin ? (
        <div className='headerRightNav'>
          <span className='headerBasketCount'></span>
          <AuthOptions />
          <span className='headerRightOption'>
            <SettingsIcon />
          </span>
        </div>
      ) : (
        <div className='headerRightNav'>
          <span className='headerBasketCount'>
            {appcontext.cart ? appcontext.cart.length : 0}
          </span>
          <Link to='/buy'>
            <span className='headerRightOption'>
              <ShoppingBasketIcon />
            </span>
          </Link>
          <AuthOptions />
          <span className='headerRightOption'>
            <SettingsIcon />
          </span>
        </div>
      )}
    </div>
  );
}

export default Header;
