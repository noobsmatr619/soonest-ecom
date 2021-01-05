import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./UpdateProduct.css";
const AddProduct = () => {
  let history = useHistory();
  const params = useParams();
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
  useEffect(() => {
    const getProductById = async () => {
      await appcontext.getProductById(params.id);
    };
    getProductById();
    console.log();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let data = { ...Form };
    data.name = appcontext.product && appcontext.product.name;
    data.price = appcontext.product && appcontext.product.price;
    data.quantity = appcontext.product && appcontext.product.quantity;
    data.category = appcontext.product && appcontext.product.category;
    data.image = appcontext.product && appcontext.product.image;
    data.size = appcontext.product && appcontext.product.size;
    data.star = appcontext.product && appcontext.product.star;
    data.description = appcontext.product && appcontext.product.description;
    setForm(data);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appcontext.product]);

  let inputHandler = e => {
    let data = { ...Form };
    data[e.target.name] = e.target.value;
    console.log(data);
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
    const update = async () => {
      form.append("name", Form.name);
      form.append("size", Form.size);
      form.append("quantity", Form.quantity);
      form.append("image", profileImage);
      form.append("category", Form.category);
      form.append("star", Form.star);
      form.append("price", Form.price);
      form.append("description", Form.description);
      await appcontext.updateProduct(params.id, form);
      console.log("submit Ru");
      history.push("/admin/addedproduct");
    };
    update();
  };
  return (
    <div>
      {appcontext.product && (
        <form onSubmit={onSubmit}>
          <div className='addProd'>
            <h1 className='prodTitle'> Add product</h1>
            <h2 className='prodTitle'> Product Name</h2>
            <input
              name='name'
              type='text'
              value={Form.name}
              onChange={inputHandler}
              className='ProdTitle'
            />
            <h2 className='prodStars'>Price</h2>
            <input
              name='price'
              value={Form.price}
              type='number'
              className='prodStars'
              onChange={inputHandler}
            />
            <h2 className='prodSize'>Size</h2>
            <input
              name='size'
              type='text'
              value={Form.size}
              className='ProdSize'
              onChange={inputHandler}
            />
            <h2 className='prodQuantity'>Quantity</h2>
            <input
              name='quantity'
              type='text'
              value={Form.quantity}
              className='prodQuant'
              onChange={inputHandler}
            />
            <h2 className='prodCat'>Category</h2>
            <input
              name='category'
              type='text'
              value={Form.category}
              className='prodCat'
              onChange={inputHandler}
            />
            <h2 className='prodStars'>Stars</h2>
            <input
              name='star'
              type='number'
              value={Form.star}
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
              value={Form.description}
              className='prodDesc'
              onChange={inputHandler}
            />
            <br />
            <br />
            <button type='submit'>Update Product</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddProduct;
