import React, { useContext, useEffect } from "react";
import { APIs } from "../../constraint/API";
import Product from "./components/Product";
import "./ProductShow.css";
import AppContext from "../../Context/AppContext";
function AllOder() {
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getAllOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className='productShow'>
      <div classname='prodDetails'>
        <div className='leftShow'>
          <div className='rightShow'>
            {appcontext.order &&
              appcontext.order.length > 0 &&
              appcontext.order.map(p => {
                return p.product.map(product => {
                  return (
                    <Product
                      product={product}
                      id={product.id}
                      address={p.data[0] && p.data[0].address}
                      date={product.dateOfPurchase}
                      name={product.name}
                      cost={product.price}
                      payment={product.paymentId}
                      star={product.star}
                      image={`${APIs}/uploads/${product.image}`}
                    />
                  );
                });
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllOder;
