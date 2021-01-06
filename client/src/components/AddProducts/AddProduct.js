import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./AddProduct.css";
const AddProduct = () => {
  const history = useHistory();
  let appcontext = useContext(AppContext);
  const [profileImage, setprofileImage] = useState("");
  const [Form, setForm] = useState({
    name: "",
    size: "",
    quantity: "",
    image: "",
    description: "",
    star: "",
    category: "",
    price: "",
  });

  let inputHandler = e => {
    let data = { ...Form };
    data[e.target.name] = e.target.value;
    setForm(data);
  };
  let imageInputHandler = e => {
    let data;
    data = e.target.files[0];
    setprofileImage(data);
  };
  let onSubmit = e => {
    e.preventDefault();
    let form = new FormData();
    const AddForm = async () => {
      form.append("name", Form.name);
      form.append("size", Form.size);
      form.append("quantity", Form.quantity);
      form.append("image", profileImage);
      form.append("category", Form.category);
      form.append("star", Form.star);
      form.append("price", Form.price);
      form.append("description", Form.description);
      await appcontext.addProduct(form);
      history.push("/admin/addedproduct");
    };
    AddForm();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='addProd'>
          <h1 className='prodTitle'> Add product</h1>
          <h4 className='prodTitle'> All the fields are recquired</h4>
          <h2 className='prodTitle'> Product Name</h2>
          <input
            name='name'
            type='text'
            onChange={inputHandler}
            className='ProdTitle'
          />
          <h2 className='prodStars'>Price</h2>
          <input
            name='price'
            type='number'
            className='prodStars'
            onChange={inputHandler}
          />
          <h2 className='prodSize'>Size</h2>
          <input
            name='size'
            type='text'
            className='ProdSize'
            onChange={inputHandler}
          />
          <h2 className='prodQuantity'>Quantity</h2>
          <input
            name='quantity'
            type='text'
            className='prodQuant'
            onChange={inputHandler}
          />
          <h2 className='prodCat'>Category</h2>
          <input
            name='category'
            type='text'
            className='prodCat'
            onChange={inputHandler}
          />
          <h2 className='prodStars'>Stars</h2>
          <input
            name='star'
            type='number'
            className='prodStars'
            onChange={inputHandler}
          />
          <h2 className='prodImg'>Image</h2>
          <input
            type='file'
            className='prodImage'
            onChange={imageInputHandler}
          />
          <h2 className='prodDescription'>Description</h2>
          <input
            name='description'
            type='text'
            className='prodDesc'
            onChange={inputHandler}
          />
          <br />
          <button type='submit'>submit</button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
