import React, { useReducer } from "react";
import io from "socket.io-client";

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
  RESET_PASSWORD,
  EMPTY_CART,
  ADD_TO_WISHLIST,
  FILTER_PRODUCTS,
  ALL_ORDER,
  MODE,
  UPDATE_USER,
  CREATE_SOCKET,
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
    wishlist: [],
    socket: null,
    searchproduct: [],
    order: [],
    mode: true,
  };
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const switchMode = async () => {
    dispatch({ type: MODE });
  };
  const UpdateStar = async form => {
    try {
      const res = await axios.patch(`${APIs}/api/product/rate`, form);
      loadUser();
    } catch (error) {
      console.log(error);
    }
  };
  const connection = async () => {
    let socket = io.connect(APIs);
    dispatch({
      type: CREATE_SOCKET,
      payload: socket,
    });
  };
  const updateUser = async form => {
    try {
      let res = await axios.patch(`${APIs}/api/user/update/info`, form);
      dispatch({
        type: UPDATE_USER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getAllOrder = async () => {
    try {
      console.log("runngin order");
      let res = await axios.get(`${APIs}/api/order`);
      console.log(res);
      dispatch({
        type: ALL_ORDER,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const filterproducts = val => {
    dispatch({ type: FILTER_PRODUCTS, payload: val });
  };
  const emptyCart = () => {
    dispatch({
      type: EMPTY_CART,
    });
  };
  const resetPassword = async form => {
    try {
      console.log("Acton RUn");
      const res = await axios.post(`${APIs}/api/user/reset-password`, form);
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data,
      });
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
  const changePassword = async (form, token) => {
    try {
      let Form = {
        password: form.password,
        token: token,
      };
      const res = await axios.post(`${APIs}/api/user/new-password`, Form);
      toast.success(res.data.msg);
    } catch (error) {
      console.log("here");
      console.log(error);
    }
  };
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
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response.data,
      });
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
        payload: error.response.data,
      });
    }
    loadUser();
  };
  //LOGIN_USER
  const loginUser = async user => {
    let res;
    try {
      res = await axios.post(`${APIs}/api/user/login`, user);
      console.log(res);
      dispatch({
        type: LOGIN_USER,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response.data,
      });
    }
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
        payload: error.response.data,
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
  const getWishlist = () => {
    let cart = localStorage.getItem("wishlist");
    cart = JSON.parse(cart);

    dispatch({
      type: ADD_TO_WISHLIST,
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
  const removeFromWishlist = products => {
    let wishlist = localStorage.getItem("wishlist");
    let parseCart = JSON.parse(wishlist);
    parseCart = parseCart.filter(c => c._id !== products._id);
    let unparse = JSON.stringify(parseCart);
    localStorage.setItem("wishlist", unparse);
    let cart2 = localStorage.getItem("wishlist");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: cart3,
    });
  };
  const addToBasket = products => {
    let cart = localStorage.getItem("cart");
    let wishlist = localStorage.getItem("wishlist");
    if (wishlist === "" || wishlist === null) {
      return "";
    } else {
      let wishlist = localStorage.getItem("wishlist");
      let parseCart = JSON.parse(wishlist);
      parseCart = parseCart.filter(c => c._id !== products._id);
      let unparse = JSON.stringify(parseCart);
      localStorage.setItem("wishlist", unparse);
    }
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
    let wishlist2 = localStorage.getItem("wishlist");
    let wishlist3 = JSON.parse(wishlist2);
    console.log(wishlist3);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: wishlist3,
    });
  };

  const addToWishlist = products => {
    let wishlist = localStorage.getItem("wishlist");
    console.log(wishlist);
    if (wishlist === "" || wishlist === null) {
      let arr = [];
      arr.push(products);
      let product = JSON.stringify(arr);
      localStorage.setItem("wishlist", product);
    } else {
      let wishlist = localStorage.getItem("wishlist");
      let parseCart = JSON.parse(wishlist);
      parseCart.push(products);
      let unparse = JSON.stringify(parseCart);
      localStorage.setItem("wishlist", unparse);
    }
    let cart2 = localStorage.getItem("wishlist");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: cart3,
    });
  };
  const addAuthToBasket = async products => {
    let cart = localStorage.getItem("cart");
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
  const addAuthToWishlist = async products => {
    let cart = localStorage.getItem("wishlist");
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
      let res = await axios.post(
        `${APIs}/api/cart/wishlist/add`,
        product,
        config
      );
      product = JSON.stringify(res.data);
      // debugger;
      localStorage.setItem("wishlist", product);
    } else {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      let cart = localStorage.getItem("wishlist");
      let parseCart = JSON.parse(cart);
      parseCart.push(products);
      let unparse = JSON.stringify(parseCart);
      let res = await axios.post(
        `${APIs}/api/cart/wishlist/add`,
        unparse,
        config
      );
      unparse = JSON.stringify(res.data);
      localStorage.setItem("wishlist", unparse);
    }
    let cart2 = localStorage.getItem("wishlist");
    let cart3 = JSON.parse(cart2);
    console.log(cart3);
    dispatch({
      type: ADD_TO_WISHLIST,
      payload: cart3, //payload has the response from the server
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
  const removeAuthFromWishlist = async products => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let wishlist = localStorage.getItem("wishlist");
    let parseCart = JSON.parse(wishlist);
    parseCart = parseCart.filter(c => c._id !== products._id);
    let unparse = JSON.stringify(parseCart);
    let res = await axios.post(
      `${APIs}/api/cart/wishlist/add`,
      unparse,
      config
    );
    unparse = JSON.stringify(res.data);
    localStorage.setItem("wishlist", unparse);
    let cart2 = localStorage.getItem("wishlist");
    let cart3 = JSON.parse(cart2);
    dispatch({
      type: ADD_TO_WISHLIST,
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
        wishlist: state.wishlist,
        searchproduct: state.searchproduct,
        order: state.order,
        mode: state.mode,
        socket: state.socket,
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
        resetPassword,
        changePassword,
        emptyCart,
        addToWishlist,
        removeFromWishlist,
        getWishlist,
        addAuthToWishlist,
        removeAuthFromWishlist,
        filterproducts,
        getAllOrder,
        switchMode,
        updateUser,
        connection,
        UpdateStar,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppState;



