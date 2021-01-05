import React, { useReducer } from "react";
import AppContext from "./AppContext";
import { toast } from "react-toastify";
import AppReducer from "./AppReducer";
import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import { APIs } from "../constraint/API";
import { useHistory } from "react-router-dom";
import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  ADMIN_LOGIN,
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_BLOG,
  GET_ALL_BLOG,
  GET_BLOG_BY_ID,
  GET_BASKET,
  GET_ADMIN,
  GET_USER_BY_ID,
  GET_ALL_USER,
  RECIVE_MESSAGE,
  SEND_MESSAGE,
} from "./types";

const AppState = props => {
  const history = useHistory();
  const initialState = {
    token: localStorage.getItem("token"),
    products: [],
    isAuthenticated: false,
    user: null,
    product: null,
    blogs: [],
    cart: [],
    blog: null,
    admin: [],
    userbyid: null,
    users: [],
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const getUserByID = async id => {
    try {
      const res = await axios.get(`${APIs}/api/user/get/${id}`);
      dispatch({
        type: GET_USER_BY_ID,
        payload: res.data,
      });
    } catch (error) {}
  };

  //lOAD ADMIN

  const getAllUser = async () => {
    try {
      let res = await axios.get(`${APIs}/api/user/all`);
      dispatch({
        type: GET_ALL_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAdmin = async () => {
    try {
      let res = await axios.get(`${APIs}/api/admin`);
      dispatch({
        type: GET_ADMIN,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addAdmin = async form => {
    try {
      await axios.post(`${APIs}/api/admin/addadmin`, form);
      toast.success("Admin added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async form => {
    try {
      await axios.post(`${APIs}/api/message/new`, form);
    } catch (error) {
      console.log(error);
    }
  };
  //lOAD User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get(`${APIs}/api/user`);
      dispatch({
        type: LOAD_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  //Register User
  const registerUser = async user => {
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await axios.post(`${APIs}/api/user/signup`, user, config);
      dispatch({
        type: REGISTER_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }
    loadUser();
  };
  //LOGIN_USER
  const loginUser = async user => {
    try {
      let res = await axios.post(`${APIs}/api/admin/login`, user);
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
      });
    }
    loadUser();
  };
  // login Admin
  const loginAdmin = async user => {
    try {
      let res = await axios.post(`${APIs}/api/admin/login`, user);
      dispatch({
        type: ADMIN_LOGIN,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
      });
    }
    loadUser();
  };
  //Add product
  const addProduct = async form => {
    try {
      let res = await axios.post(`${APIs}/api/product/addproduct`, form);
      console.log(res);
      dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //GetAllProduct
  const getAllProduct = async () => {
    try {
      let res = await axios.get(`${APIs}/api/product`);
      console.log(res);
      console.log("runnung");
      // console.log(res);
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  //GEt Product by Id
  const getProductById = async id => {
    try {
      console.log("This is Running");
      const res = await axios.get(`${APIs}/api/product/${id}`);
      // console.log(res);
      dispatch({
        type: GET_PRODUCT_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  //delete Product
  const deleteProduct = async id => {
    try {
      await axios.delete(`${APIs}/api/product/${id}`);
      getAllProduct();
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  //Update a Product
  const updateProduct = async (id, form) => {
    try {
      console.log("Acton RUn");
      await axios.post(`${APIs}/api/product/${id}`, form);
      getAllProduct();
      history.push("admin/addedproduct");
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  //Add Blog
  const addBlog = async form => {
    try {
      let res = await axios.post(`${APIs}/api/blog/addblog`, form);
      dispatch({
        type: ADD_BLOG,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // GET ALL BLOGS
  const getAllBlog = async () => {
    try {
      let res = await axios.get(`${APIs}/api/blog`);
      console.log(res.data);
      console.log("runnung");
      // console.log(res);
      dispatch({
        type: GET_ALL_BLOG,
        payload: res.data,
      });
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  const deleteBlog = async id => {
    try {
      await axios.delete(`${APIs}/api/blog/${id}`);
      getAllBlog();
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  const getBlogById = async id => {
    try {
      console.log("This is Running");
      const res = await axios.get(`${APIs}/api/blog/${id}`);
      // console.log(res);
      dispatch({
        type: GET_BLOG_BY_ID,
        payload: res.data,
      });
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  const updateBlog = async (id, form) => {
    try {
      console.log("Acton RUn");
      await axios.post(`${APIs}/api/blog/${id}`, form);
      getAllProduct();
      history.push("admin/addedblog");
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  const getBasket = () => {
    let cart = localStorage.getItem("cart");
    cart = JSON.parse(cart);

    dispatch({
      type: GET_BASKET,
      payload: cart,
    });
  };
  const getAuthBasket = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let cart = localStorage.getItem("cart");
    if (cart !== null) {
      cart = JSON.parse(cart);
      let res = await axios.post(`${APIs}/api/cart/auth`, cart, config);
      cart = JSON.stringify(res.data);
      localStorage.setItem("cart", cart);
      cart = JSON.parse(cart);
      dispatch({
        type: GET_BASKET,
        payload: cart,
      });
    }
  };
  const removeFromCart = products => {
    let cart = localStorage.getItem("cart");
    let parseCart = JSON.parse(cart);
    parseCart = parseCart.filter(c => c._id !== products._id);
    let unparse = JSON.stringify(parseCart);
    localStorage.setItem("cart", unparse);
    let cart2 = localStorage.getItem("cart");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: GET_BASKET,
      payload: cart3,
    });
  };
  const addToBasket = products => {
    let cart = localStorage.getItem("cart");
    console.log(cart);
    if (cart === "" || cart === null) {
      let arr = [];
      arr.push(products);
      let product = JSON.stringify(arr);
      localStorage.setItem("cart", product);
    } else {
      let cart = localStorage.getItem("cart");
      let parseCart = JSON.parse(cart);
      parseCart.push(products);
      let unparse = JSON.stringify(parseCart);
      localStorage.setItem("cart", unparse);
    }
    let cart2 = localStorage.getItem("cart");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: GET_BASKET,
      payload: cart3,
    });
  };
  const addAuthToBasket = async products => {
    let cart = localStorage.getItem("cart");
    console.log(cart);
    if (cart === "" || cart === null) {
      console.log("here");
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let arr = [];
      arr.push(products);
      let product = JSON.stringify(arr);
      console.log(product);
      let res = await axios.post(`${APIs}/api/cart/add`, product, config);
      product = JSON.stringify(res.data);
      // debugger;
      localStorage.setItem("cart", product);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let cart = localStorage.getItem("cart");
      let parseCart = JSON.parse(cart);
      parseCart.push(products);
      let unparse = JSON.stringify(parseCart);
      let res = await axios.post(`${APIs}/api/cart/add`, unparse, config);
      unparse = JSON.stringify(res.data);
      localStorage.setItem("cart", unparse);
    }
    let cart2 = localStorage.getItem("cart");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: GET_BASKET,
      payload: cart3,
    });
  };
  const removeAuthFromCart = async products => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let cart = localStorage.getItem("cart");
    let parseCart = JSON.parse(cart);
    parseCart = parseCart.filter(c => c._id !== products._id);
    let unparse = JSON.stringify(parseCart);
    let res = await axios.post(`${APIs}/api/cart/add`, unparse, config);
    unparse = JSON.stringify(res.data);
    localStorage.setItem("cart", unparse);
    let cart2 = localStorage.getItem("cart");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: GET_BASKET,
      payload: cart3,
    });
  };
  //LOGOUT
  const logOut = () => {
    dispatch({ type: LOGOUT_USER });
  };
  return (
    <AppContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        products: state.products,
        product: state.product,
        blogs: state.blogs,
        blog: state.blog,
        cart: state.cart,
        admin: state.admin,
        userbyid: state.userbyid,
        users: state.users,
        registerUser,
        loginUser,
        loadUser,
        logOut,
        loginAdmin,
        addProduct,
        getAllProduct,
        deleteProduct,
        getProductById,
        updateProduct,
        addBlog,
        getAllBlog,
        deleteBlog,
        getBlogById,
        updateBlog,
        addAdmin,
        addToBasket,
        getBasket,
        removeFromCart,
        addAuthToBasket,
        removeAuthFromCart,
        getAuthBasket,
        getAdmin,
        getUserByID,
        sendMessage,
        getAllUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppState;
