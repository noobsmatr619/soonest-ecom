import React, { useState, useContext } from "react";
import "./Buy.css";
import Total from "../Total/Total";
import AddedItem from "../AddItems/AddedItem";
import AppContext from "../../Context/AppContext";
function Buy() {
  const appcontext = useContext(AppContext);
  return (
    <div className='buy'>
      <div className='leftBuy'>
        <div className='ShpListName'>
          <h2>Shopping Basket</h2>
          {appcontext.cart &&
            appcontext.cart.length > 0 &&
            appcontext.cart.map(item => (
              <AddedItem
                product={item}
                id={item._id}
                name={item.name}
                image={item.image}
                cost={item.price}
                stars={item.star}
              />
            ))}
        </div>
      </div>
      <div className='righBuy'>
        <Total />
      </div>
    </div>
  );
}

export default Buy;
