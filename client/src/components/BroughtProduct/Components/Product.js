/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import moment from "moment";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import AppContext from "../../../Context/AppContext";
import "./Product.css";
import { Link } from "react-router-dom";
import { APIs } from "../../../constraint/API";
function Product({
  id,
  name,
  cost,
  star,
  image,
  product,
  payment,
  date,
  rated,
}) {
  const appcontext = useContext(AppContext);
  const [modal, setModal] = useState(false);
  const [rate, setrate] = useState(0);

  const toggle = () => setModal(!modal);
  const onSubmit = e => {
    e.preventDefault();
    product.star = rate;
    appcontext.UpdateStar(product);
    setModal(false);
  };
  return (
    <>
      <div className='product'>
        <div className='infoProd'>
          <Link style={{ textDecoration: "none", color: "black" }}>
            <Button
              disabled={rated}
              onClick={toggle}
              style={{ marginTop: "30px" }}
              className='mt-10'
            >
              Rate the product
            </Button>
            <p className='prodTittle'>{name}</p>
            <p className='prodPrice'>
              <small>£</small>
              <strong>{cost}</strong>
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
        <img style={{ height: "150px" }} src={image} alt='#' />
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Rate Your Product</ModalHeader>
        <ModalBody>
          <Input
            name='rate'
            type='number'
            onChange={e => {
              setrate(e.target.value);
            }}
          ></Input>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' type='submit' onClick={onSubmit}>
            Submit Rate
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Product;
