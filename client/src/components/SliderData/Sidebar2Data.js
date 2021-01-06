import React from "react";
import "./SidebarData.css";
import HomeIcon from "@material-ui/icons/Home";
import ShopIcon from "@material-ui/icons/Shop";
import Payment from "@material-ui/icons/Payment";
import MessageIcon from "@material-ui/icons/Message";
import StoreIcon from "@material-ui/icons/Store";

export let Sidebar2Data = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Products",
    path: "/admin/allorder",
    icon: <Payment />,
    cName: "nav-text",
  },

  {
    title: "Messages",
    path: "/chat",
    icon: <MessageIcon />,
    cName: "nav-text",
  },
];
