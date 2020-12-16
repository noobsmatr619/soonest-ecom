import React from 'react'
import CurrencyFormat from "react-currency-format";
import './Total.css'
import { useStateValue } from "./SessionState";
import {getPriceTotal} from "./reducer"
function Total() {
    let [{ cart }, path] = useStateValue();
    return (
        <div className="total">
             <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            
              Subtotal ({cart?.length} products ): <strong>{value}</strong>
            </p>
            <small className="wrapperSubtotal">
              <input type="checkbox" /> Wrap this up 
            </small>
          </>
        )}
        decimalScale={2}
        value={getPriceTotal(cart)}  
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <button>Checkout</button>
        </div>
    )
}

export default Total 
