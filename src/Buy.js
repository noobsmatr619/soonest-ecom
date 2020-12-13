import React from 'react'
import "./Buy.css";
import Total from "./Total"

function Buy() {
  
    return (
        <div className="buy">
          
          <div className="leftBuy">
            <div className="ShpListName">
                <h2>Shopping Basket</h2>
            </div>
          </div>
            <div className="righBuy">
                <Total/>
            </div>
        </div>
    )
}

export default Buy
