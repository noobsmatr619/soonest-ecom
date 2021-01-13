/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import moment from "moment";
import "./Product.css";
import { Link } from "react-router-dom";
function Product({
  id,
  name,
  cost,
  star,
  image,
  product,
  payment,
  date,
  address,
}) {
  return (
    <div className='product'>
      <div className='infoProd'>
        <Link style={{ textDecoration: "none", color: "black" }}>
          <p className='prodTittle'>{name}</p>
          <p className='prodPrice'>
            <small>£</small>
            <strong>{cost}</strong>
          </p>
          <p className='prodPrice'>
            <small>Address</small>
            <strong>{`${address && address.line1} , ${
              address && address.city
            }`}</strong>
          </p>
          <p className='prodPrice'>
            <strong>{moment(date).format("YYYY-MM-DD")}</strong>
          </p>
          <p className='prodPrice'>
            <strong>{payment}</strong>
          </p>
          <div className='prodRating'>
            <p> {"⭐".repeat(star || 5)}</p>
          </div>
        </Link>
      </div>
      <img src={image} alt='#' />
    </div>
  );
}

export default Product;
