/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Delete from "@material-ui/icons/DeleteForeverOutlined";
import Edit from "@material-ui/icons/EditAttributesOutlined";

import "./Product.css";
import { Link } from "react-router-dom";
import AppContext from "../../Context/AppContext";
function Product({ id, name, cost, stars, image, product }) {
  const [add, setadd] = useState(false);
  const [add1, setadd1] = useState(false);
  const [click, setclick] = useState(false);
  useRef(add);
  const appcontext = useContext(AppContext);
  useEffect(() => {
    if (
      appcontext.isAuthenticated &&
      appcontext.user &&
      !appcontext.user.admin
    ) {
      appcontext.getAuthBasket();
    } else {
      appcontext.getBasket();
    }
  }, []);
  useEffect(() => {
    console.log("Clicked");
    if (appcontext.wishlist) {
      if (appcontext.wishlist.length > 0) {
        let filter = [];
        filter = appcontext.wishlist.filter(c => c._id === id);
        if (filter.length > 0) {
          setadd1(true);
        } else {
          setadd1(false);
        }
      } else {
        console.log("Less then Zero");
        setadd1(false);
      }
      // console.log(add);
    }
    if (appcontext.cart) {
      if (appcontext.cart.length > 0) {
        let filter = [];
        filter = appcontext.cart.filter(c => c._id === id);
        if (filter.length > 0) {
          setadd(true);
        } else {
          setadd(false);
        }
      } else {
        console.log("Less then Zero");
        setadd(false);
      }
      // console.log(add);
    }
  }, [appcontext.cart, click, appcontext.wishlist]);

  const location = useLocation();
  const history = useHistory();
  return (
    <div className='product'>
      <div className='infoProd'>
        <Link to='/shop' style={{ textDecoration: "none", color: "black" }}>
          <p className='prodTittle'>{name}</p>
          <p className='prodPrice'>
            <small>£</small>
            <strong>{cost}</strong>
          </p>
          <div className='prodRating'>
            <p> {"⭐".repeat(stars)}</p>
          </div>
        </Link>
      </div>
      <img src={image} alt='#' />
      { appcontext.isAuthenticated && appcontext.user && appcontext.user.admin ? (
        <>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              appcontext.deleteProduct(id);
            }}
          >
            Delete
            <Delete />
          </span>{" "}
          <br />
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push(`/admin/updateproduct/${id}`);
            }}
          >
            Edit <Edit />
          </span>
        </>
      ) : (
          <>
            {appcontext.isAuthenticated && appcontext.user && !appcontext.user.admin ? (
              <>
                {console.log("in auth")}
                {!add ? (
                  <>
                    <button
                      onClick={() => {
                        appcontext.addAuthToBasket(product);
                      }}
                    >
                      Add to Basket
                  </button>
                    {""}
                    {""}
                    {!add1 ? (
                      <button
                        onClick={() => {
                          setclick(!click);
                          appcontext.addToWishlist(product);
                        }}
                      >
                        Add to WishList
                      </button>
                    ) : (
                        <button
                          onClick={() => {
                            setclick(!click);
                            appcontext.removeFromWishlist(product);
                          }}
                        >
                          Remove to WishList
                        </button>
                      )}
                  </>
                ) : (
                    <button
                      onClick={() => {
                        setclick(!click);
                        appcontext.removeAuthFromCart(product);
                      }}
                    >
                      Remove From Carts
                    </button>
                  )}
              </>
            ) : (
                <>
                  {!add ? (
                    <>
                      <button className="addToBasket"
                        onClick={() => {
                          setclick(!click);
                          appcontext.addToBasket(product);
                        }}
                      >
                        Add to Basket
                  </button>
                      {""}
                      {!add1 ? (
                        <button className="addToWishlist"
                          onClick={() => {
                            setclick(!click);
                            appcontext.addToWishlist(product);
                          }}
                        >
                          Add to WishList
                        </button>
                      ) : (
                          <button
                            onClick={() => {
                              setclick(!click);
                              appcontext.removeFromWishlist(product);
                            }}
                          >
                            Remove to WishList
                          </button>
                        )}
                    </>
                  ) : (
                      <button
                        onClick={() => {
                          setclick(!click);
                          appcontext.removeFromCart(product);
                        }}
                      >
                        Remove From Carts
                      </button>
                    )}
                </>
              )}
          </>
        )}
    </div>
  );
}

export default Product;
