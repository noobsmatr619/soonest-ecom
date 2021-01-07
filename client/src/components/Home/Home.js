import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { APIs } from "../../constraint/API";
import SimpleSlider from "../../Assets/Slider";
import Product from "../Product/Product";

import "./Home.css";
function Home() {
  const appcontext = useContext(AppContext);
  return (
    <div className='home'>
      <div className='homeCont'>
        <SimpleSlider />

        <div className='homeRow'>
          {appcontext.products &&
            appcontext.products.length > 0 &&
            appcontext.products.map((product, i) => {
              if (i <= 1) {
                return (
                  <Product
                    product={product}
                    id={product._id}
                    name={product.name}
                    cost={product.price}
                    stars={product.star}
                    image={`${APIs}/uploads/${product.image}`}
                  />
                );
              }
            })}
        </div>
        <div className='homeRow'>
          {appcontext.products &&
            appcontext.products.length > 3 &&
            appcontext.products.map((product, i) => {
              if (i <= 3) {
                return (
                  <Product
                    product={product}
                    id={product._id}
                    name={product.name}
                    cost={product.price}
                    stars={product.star}
                    image={`${APIs}/uploads/${product.image}`}
                  />
                );
              }
            })}
        </div>
        <div className='homeRow'>
          {appcontext.products &&
            appcontext.products.length > 4 &&
            appcontext.products.map((product, i) => {
              if (i <= 0) {
                return (
                  <Product
                    product={product}
                    id={product._id}
                    name={product.name}
                    cost={product.price}
                    stars={product.star}
                    image={`${APIs}/uploads/${product.image}`}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
