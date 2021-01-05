import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import DraftsIcon from "@material-ui/icons/Drafts";
import AppContext from "../../Context/AppContext";
import "./Addblog.css";
const UpdateBlog = () => {
  const params = useParams();
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
  useEffect(() => {
    const getBlogById = async () => {
      await appcontext.getBlogById(params.id);
    };
    getBlogById();
    console.log(appcontext);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (
      appcontext.blog &&
      appcontext.blog.category &&
      appcontext.blog.title &&
      appcontext.blog.editor
    ) {
      setCategory(appcontext.blog.category);
      setTitle(appcontext.blog.title);
      setEditor(appcontext.blog.editor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appcontext.blog]);
  let onSubmit = e => {
    e.preventDefault();
    let form = new FormData();
    const AddForm = async () => {
      form.append("title", Title);
      form.append("category", Category);
      form.append("editor", Editor);
      form.append("image", profileImage);
      console.log(appcontext);
      await appcontext.updateBlog(params.id, form);
    };
    AddForm();
  };
  return (
    <div>
      <div className='addBlog'>
        <h2 className='blogTitle'>Title</h2>
        <input
          name='title'
          type='text'
          value={Title}
          className='inputTitle'
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <h2 className='categoryTitle'>Category</h2>
        <input
          name='category'
          type='text'
          value={Category}
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
        <SunEditor
          name='editor'
          setContents={Editor}
          onChange={inputEditorHandler}
        />

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

export default UpdateBlog;
