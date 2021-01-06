import React, { useContext, useEffect } from "react";
import { APIs } from "../../constraint/API";
import Product from "./Components/Product";
import "./ProductShow.css";
import AppContext from "../../Context/AppContext";
function ProductShow() {
  const appcontext = useContext(AppContext);

  return (
    <div className='productShow'>
      <div classname='prodDetails'>
        <div className='leftShow'>
          <div className='rightShow'>
            {appcontext.user &&
              appcontext.user.orderhistory.length > 0 &&
              appcontext.user.orderhistory.map(product => (
                <Product
                  product={product}
                  id={product.id}
                  date={product.dateOfPurchase}
                  name={product.name}
                  cost={product.price}
                  payment={product.paymentId}
                  star={product.star}
                  image={`${APIs}/uploads/${product.image}`}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShow;
