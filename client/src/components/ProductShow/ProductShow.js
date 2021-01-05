import React, { useContext, useEffect } from "react";
import { APIs } from "../../constraint/API";
import Product from "../Product/Product";
import "./ProductShow.css";
import AppContext from "../../Context/AppContext";
function ProductShow() {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getAllProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='productShow'>
      <div classname='prodDetails'>
        <div className='leftShow'>
          <div className='SearchFilter'>
            <h3> Departments </h3>
            <p>Any</p>
            <p>Electronics</p>
            <p>Candles</p>
            <p>Birds</p>
            <h3> Price </h3>
            <p>Any</p>
            <p>High</p>
            <p>low</p>
            <h3>Rating</h3>

            <p className='prodRatingFilter'>⭐⭐⭐⭐⭐</p>
            <p className='prodRatingFilter'>⭐⭐⭐⭐</p>
            <p className='prodRatingFilter'>⭐⭐⭐</p>
            <p className='prodRatingFilter'>⭐⭐</p>
            <p className='prodRatingFilter'>⭐</p>
          </div>

          <div className='rightShow'>
            {appcontext.products &&
              appcontext.products.length > 0 &&
              appcontext.products.map(product => (
                <Product
                  product={product}
                  id={product._id}
                  name={product.name}
                  cost={product.price}
                  stars={product.star}
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
