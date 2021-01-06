import React, { useState, useContext, useEffect } from "react";
import "./Buy.css";
import AddedItem from "./Components/AddedItem";
import AppContext from "../../Context/AppContext";
function WishList() {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getWishlist();
  }, []);
  return (
    <div className='buy'>
      <div className='leftBuy'>
        <div className='ShpListName'>
          <h2>WishList</h2>
          {appcontext.wishlist &&
            appcontext.wishlist.length > 0 &&
            appcontext.wishlist.map(item => (
              <>
                {console.log(item)}
                <AddedItem
                  product={item}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  cost={item.price}
                  stars={item.star}
                />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}

export default WishList;
