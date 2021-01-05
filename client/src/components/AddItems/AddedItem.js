import React, { useContext } from "react";
import { APIs } from "../../constraint/API";
import "./AddedItem.css";
import AppContext from "../../Context/AppContext";
function AddedItem({ _id, name, cost, star, image, product }) {
  const appcontext = useContext(AppContext);
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
          <button
            onClick={() => {
              appcontext.removeAuthFromCart(product);
            }}
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => {
              appcontext.removeFromCart(product);
            }}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
}

export default AddedItem;
