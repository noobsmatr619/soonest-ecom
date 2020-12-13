import React from 'react'
import './SidebarData.css'
import HomeIcon from '@material-ui/icons/Home';
import ShopIcon from '@material-ui/icons/Shop';
import MessageIcon from '@material-ui/icons/Message';
import StoreIcon from '@material-ui/icons/Store';
export let SidebarData=[
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
      },
      {
        title: 'Best Products',
        path: '/',
        icon: <ShopIcon/>,
        cName: 'nav-text'
      },
      {
        title: 'Products',
        path: '/',
        icon: <StoreIcon/>,
        cName: 'nav-text'
      },
     
      {
        title: 'Messages',
        path: '/',
        icon: <MessageIcon/>,
        cName: 'nav-text'
      }

    ]