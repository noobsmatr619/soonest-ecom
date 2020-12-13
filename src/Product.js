import React from 'react'
import "./Product.css";
function Product({name,cost,stars,image}) {
    return (
        <div className="product">
            <div className="infoProd">
                <p className="prodTittle">{name}</p>
                <p className="prodPrice"><small>£</small><strong>{cost}</strong></p>
                <div className="prodRating">
                    { Array(stars)
                    .fill()
                    .map((_, i) => (
                    <p>⭐</p>
                    ))}
                 </div>

                </div>
                <img src={image} alt='#' />
                <button>Add to Basket</button>
            </div>
    )
}

export default Product
