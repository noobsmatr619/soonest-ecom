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
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                appcontext.filterproducts("");
              }}
            >
              Any
            </span>
            <br />
            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                appcontext.filterproducts("Electro");
              }}
            >
              Electronics
            </span>
            <br />

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                appcontext.filterproducts("candles");
              }}
            >
              Candles
            </span>
            <br />

            <span
              style={{ cursor: "pointer" }}
              onClick={() => {
                appcontext.filterproducts("birds");
              }}
            >
              Birds
            </span>
            <br />
          </div>

          <div className='rightShow'>
            {appcontext.products && appcontext.products.length > 0 ? (
              appcontext.products.map(product => (
                <Product
                  product={product}
                  id={product._id}
                  name={product.name}
                  cost={product.price}
                  stars={product.star}
                  image={`${APIs}/uploads/${product.image}`}
                />
              ))
            ) : (
              <h3>No Product to Show</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductShow;