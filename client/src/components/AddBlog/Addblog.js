import React, { useState, useContext, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from "@material-ui/icons/Drafts";
import AppContext from "../../Context/AppContext";
import { useHistory } from "react-router-dom";
import "./Addblog.css";
const Addblog = () => {
  const history = useHistory();
  const [profileImage, setprofileImage] = useState("");
  const [Category, setCategory] = useState("");
  const [Title, setTitle] = useState("");
  const [Editor, setEditor] = useState("");
  const appcontext = useContext(AppContext);
  const inputEditorHandler = e => {
    setEditor(e);
  };

  // const inputHandler = e => {
  //   let data = { ...Form };
  //   data[e.target.name] = e.target.value;
  //   setForm(data);
  // };
  let imageInputHandler = e => {
    let data;
    data = e.target.files[0];
    setprofileImage(data);
  };
  let onSubmit = e => {
    e.preventDefault();
    let form = new FormData();
    const AddForm = async () => {
      form.append("title", Title);
      form.append("category", Category);
      form.append("editor", Editor);
      form.append("image", profileImage);
      console.log(appcontext);
      await appcontext.addBlog(form);
    };
    AddForm();
  };
  return (
    <div>
      <div className='addBlog'>
        <h4 className='blogTitle'>All fields are required to be filled</h4>
        <h2 className='blogTitle'>Title</h2>
        <input
          name='title'
          type='text'
          className='inputTitle'
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <h2 className='categoryTitle'>Category</h2>
        <input
          name='category'
          type='text'
          classclassName='categoryTitle '
          onChange={e => {
            setCategory(e.target.value);
          }}
        />
        <h2 className='UploadTitle'>Upload</h2>
        <input
          type='file'
          className='UploadFile'
          onChange={imageInputHandler}
        />
        <h2 className='blogEditor'>Blog Body</h2>
        <SunEditor name='editor' onChange={inputEditorHandler} />

        {/* https://github.com/mkhstar/suneditor-react  */}
        <IconButton onClick={onSubmit}>
          <SaveIcon />
        </IconButton>
        <IconButton>
          <DeleteIcon />
        </IconButton>
        <IconButton>
          {" "}
          <DraftsIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Addblog;
