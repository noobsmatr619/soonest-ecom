import React, { useContext, useState, useEffect } from "react";
import { APIs } from "../../../constraint/API";
import "./AddedItem.css";
import AppContext from "../../../Context/AppContext";
function AddedItem({ id, name, cost, star, image, product }) {
  const appcontext = useContext(AppContext);

  const [add, setadd] = useState(false);
  const [add1, setadd1] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appcontext.cart, appcontext.wishlist]);
  return (
    <div className='addedItem'>
      <img
        className='addedItemImage'
        src={`${APIs}/uploads/${image}`}
        alt='#'
      />
      <div className='addedItemDetails'>
        <p className='addedItemName'>{name}</p>
        <p className='addedItemPrice'>
          <small>£</small>
          <strong>{cost}</strong>
        </p>
        <div className='addedItemStar'>
          {" "}
          <p> {"⭐".repeat(star)}</p>
        </div>
        {appcontext.isAuthenticated && appcontext.user ? (
          <>
            {console.log("in auth")}
            {!add ? (
              <>
                <button
                  onClick={() => {
                    // setclick(!click);
                    appcontext.addAuthToBasket(product);
                  }}
                >
                  Add to Basket
                </button>
                {""}
                {!add1 ? (
                  <button
                    onClick={() => {
                      appcontext.addAuthToWishlist(product);
                    }}
                  >
                    Add to WishList
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      appcontext.removeAuthFromWishlist(product);
                    }}
                  >
                    Remove to WishList
                  </button>
                )}
              </>
            ) : (
              <button
                onClick={() => {
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
                <button
                  onClick={() => {
                    appcontext.addToBasket(product);
                  }}
                >
                  Add to Basket
                </button>
                {""}
                {!add1 ? (
                  <button
                    onClick={() => {
                      appcontext.addToWishlist(product);
                    }}
                  >
                    Add to WishList
                  </button>
                ) : (
                  <button
                    onClick={() => {
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
                  appcontext.removeFromCart(product);
                }}
              >
                Remove From Carts
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AddedItem;
