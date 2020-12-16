import React from 'react'
import { useStateValue } from "./SessionState";
import './AddedItem.css'

function AddedItem({id,name,cost,stars,image}) {
    let [{ cart }, path] = useStateValue();
    let removeAddedItems = () => {

        path({
            type: 'removeFromCart',
            id: id,
        })
    };
    return (
        <div className="addedItem">
           
             <img className="addedItemImage"  src={image} alt='#'   />
             <div className="addedItemDetails">
                    <p className="addedItemName">{name}</p>
                    <p className="addedItemPrice"><small>£</small><strong>{cost}</strong></p>
                    <div className="addedItemStar"> <p> {"⭐".repeat(stars)}</p>
                    </div>
                    <button onClick={removeAddedItems} >Remove</button>
             </div>
        </div>
        
    )

    
}



export default AddedItem
