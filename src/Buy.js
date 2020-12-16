import React from 'react'
import "./Buy.css";
import Total from "./Total"
import { useStateValue } from "./SessionState";
import AddedItem from './AddedItem';
function Buy() {
    let [{ cart }, path] = useStateValue();
    return (
        <div className="buy">
          
          <div className="leftBuy">
            <div className="ShpListName">
                <h2>Shopping Basket</h2>
                {cart.map(item => (
                   <AddedItem
                     id={item.id}
                     name={item.name}
                     image={item.image}
                    cost={item.cost}
                    stars={item.stars}
                    />
                 ))}

            </div>
          </div>
            <div className="righBuy">
                <Total/>
            </div>
        </div>
    )
}

export default Buy
