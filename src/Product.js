import React from 'react'
import "./Product.css";
import { useStateValue } from "./SessionState";
import { Link } from 'react-router-dom';
function Product({id,name,cost,stars,image}) {
    let [{ cart }, path] = useStateValue();
  
   //console.log(cart);

//    if(cart.length !== 0){  
//     //get local storage and beofrehande and merge with the new one putting past local storage in to variable and mergin with the new 1   

//    // let previousCart=localStorage.getItem(myCart);
//  // console.log(previousCart);
//     localStorage.setItem("myCart", JSON.stringify(cart));};
   
    let addToBasket= () => {
     
      path({
        type: "inCart",
        item: {
          id: id,
          name: name,
          image: image,
          cost: cost,
          stars: stars,
        },
      });
    };
    return (
        <div className="product">
          
            <div className="infoProd">
            <Link to="/shop" style={{ textDecoration: 'none',color:'black' }}><p className="prodTittle">{name}</p>
                <p className="prodPrice"><small>£</small><strong>{cost}</strong></p>
                <div className="prodRating"><p> {"⭐".repeat(stars)}</p>
               
                 </div></Link>

                </div>
                <img src={image} alt='#' />
                <button onClick={addToBasket}>Add to Basket</button>
          
            </div>
    )
}

export default Product
