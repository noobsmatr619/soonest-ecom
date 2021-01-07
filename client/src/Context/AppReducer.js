import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOAD_USER,
  LOGOUT_USER,
  ADMIN_LOGIN,
  LOAD_ADMIN,
  ADD_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  ADD_BLOG,
  GET_ALL_BLOG,
  GET_BLOG_BY_ID,
  GET_BASKET,
  GET_ADMIN,
  GET_USER_BY_ID,
  SEND_MESSAGE,
  RECIVE_MESSAGE,
  GET_ALL_USER,
  RESET_PASSWORD,
  EMPTY_CART,
  ADD_TO_WISHLIST,
  FILTER_PRODUCTS,
  ALL_ORDER,
  MODE,
  UPDATE_USER,
  CREATE_SOCKET,
} from "./types";
import { toast } from "react-toastify";

/* eslint-disable import/no-anonymous-default-export */
export default (state, action) => {
  switch (action.type) {
    case CREATE_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case UPDATE_USER:
      toast.success("Successfully Updated User");
      return {
        ...state,
        user: action.payload,
      };
    case MODE:
      return {
        ...state,
        mode: !state.mode,
      };
    case FILTER_PRODUCTS:
      let reg = new RegExp(action.payload, "gi");
      console.log(action.payload);
      console.log(reg);
      return {
        ...state,
        products: state.searchproduct.filter(p => {
          if (p.name.match(reg) || p.category.match(reg)) {
            console.log(p);
            return p;
          }
        }),
      };
    case ADD_TO_WISHLIST:
      return {
        ...state,
        wishlist: action.payload,
      };
    case RESET_PASSWORD:
      toast.success(action.payload.msg);
      return {
        ...state,
      };
    case ALL_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_ALL_USER:
      return {
        ...state,
        users: action.payload,
      };
    case GET_USER_BY_ID:
      return {
        ...state,
        userbyid: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        sendmessage: action.payload,
      };
    case RECIVE_MESSAGE:
      return {
        ...state,
        receivedmessage: action.payload,
      };
    case GET_ADMIN:
      return {
        ...state,
        admin: action.payload,
      };
    case LOAD_ADMIN:
      toast.success("Successfully Loaded");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOAD_USER:
      toast.success("Successfully Loaded");
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case REGISTER_USER:
      localStorage.setItem("token", action.payload.token);
      toast.success("Successfully registered");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case LOGIN_USER:
      localStorage.setItem("token", action.payload.token);
      toast.success("Successfully Login");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case ADMIN_LOGIN:
      localStorage.setItem("token", action.payload.token);
      toast.success("Successfully Login As Admin");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };

    case EMPTY_CART:
      localStorage.removeItem("cart");
      return {
        ...state,
        cart: [],
      };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("cart");
      toast.success("Successfully Logout");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        cart: [],
      };
    case ADD_PRODUCT:
      if (action.payload.success) {
        toast.success("Product Add Successfully");
      }
      return {
        ...state,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        searchproduct: action.payload,
        products: action.payload,
      };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        product: action.payload,
      };
    case ADD_BLOG:
      if (action.payload.success) {
        toast.success("Product Add Blog ");
      }
      return {
        ...state,
      };
    case GET_BLOG_BY_ID:
      return {
        ...state,
        blog: action.payload,
      };
    case GET_ALL_BLOG:
      return {
        ...state,
        blogs: action.payload,
      };
    case GET_BASKET:
      return {
        ...state,
        cart: action.payload,
      };
    case REGISTER_USER_FAIL:
      toast.error("Register FAIL Due to Some error");
      return {
        ...state,
      };
    case LOGIN_USER_FAIL:
      toast.error(action.payload);
      return {
        ...state,
      };
    default:
      break;
  }
};
