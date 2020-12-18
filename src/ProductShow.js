import React from 'react'
import Header from './Header'
import Product from './Product'
import './ProductShow.css';
import { useStateValue } from "./SessionState";
function ProductShow(id,name,cost,stars,image) {
  
    return (
        <div className="productShow">
           <Header/>
           <div className="leftShow">
       
           
           </div>
           
        </div>
    )
}

export default ProductShow
