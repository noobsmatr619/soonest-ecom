import React, { useState }  from 'react'
import './Header.css'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

import SearchIcon from '@material-ui/icons/Search';
import { SidebarData } from './SidebarData';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import SendIcon from '@material-ui/icons/Send';
import StoreIcon from '@material-ui/icons/Store';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
function Header() {
    let [sidebarHandler , SidebarState] = useState(false);

     let slideSidebar = () => SidebarState(!sidebarHandler);
    return (
        <div className='header' >
        <div className='menuIcon' >      {/* collapsing menu */}
        <IconButton className="CollapsibleMenu" onClick={slideSidebar} ><MenuIcon/></IconButton>
        <nav className={sidebarHandler ? 'nav-menu showing' : 'nav-menu'}>
        <ul className="navMenuList" onClick={slideSidebar}>
            <li className="navbar-toggle">
            <IconButton className="menuClosIcon"><CloseIcon/></IconButton>

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
        <Link to="/">
        <img className="headerLogo"src="/Image/logo.png" alt='#'/>   
      </Link>
             
        <div className='headerLeftNav'>
              {/* header option */}
                <div className='headerLeftOpt'>
                    <span className="headerOptLineOne"><HomeIcon/></span> <br/>
                    <span className="headerOptLineTwo">Home</span>
                </div>
                <div className='headerLeftOpt'>
                    <span className="headerOptLineOne"> <StoreIcon /> </span> <br/>
                    <span className="headerOptLineTwo">Shop </span>
                </div>
                 <div className='headerLeftOpt  '>
                    <span className="headerOptTLineOne"><BookIcon/></span><br/>
                    <span className="headerOptLineTwo"> Blog</span>
                </div>
                
                </div>
               
                <div className='headerSearch'>
                 <SearchIcon className="headerSearchIcon"  />
                 <input className="headerSearchInput" type="text" placeholder="Search Anything"/>
                
                 </div>
                 
                <div className="headerRightNav">
             
                <span className="headerBasketCount">O</span>
                <Link to="/buy">
                <span className="headerRightOption"><ShoppingBasketIcon/></span> 
                </Link>
                <span className="headerRightOption"><AccountCircleIcon/></span>
                <span className="headerRightOption"><SettingsIcon/></span>
                </div>
                

        
        </div>
    )
}

export default Header
