import React, { useContext, useEffect } from "react";
import { APIs } from "../../constraint/API";
import Product from "../Product/Product";
import AppContext from "../../Context/AppContext";

const AddedProduct = () => {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getAllProduct();
    console.log(appcontext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {/* {console.log("Gamiing")} */}
      <div className='rightShow'>
        {appcontext.products &&
          appcontext.products.length > 0 &&
          appcontext.products.map(product => (
            <Product
              id={product._id}
              name={product.name}
              cost={product.price}
              stars={product.star}
              image={`${APIs}/uploads/${product.image}`}
            />
          ))}
      </div>
    </div>
  );
};

export default AddedProduct;
