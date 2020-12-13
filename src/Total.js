import React from 'react'
import CurrencyFormat from "react-currency-format";
import './Total.css'
function Total() {
    return (
        <div className="Total">
             <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
            
              Subtotal (0 items): <strong>{value}</strong>
            </p>
            <small className="wrapperSubtotal">
              <input type="checkbox" /> Wrap this up 
            </small>
          </>
        )}
        decimalScale={2}
        value={0} // Part of the homework
        displayType={"text"}
        thousandSeparator={true}
        prefix={"£"}
      />
      <button>Checkout</button>
        </div>
    )
}

export default Total 
