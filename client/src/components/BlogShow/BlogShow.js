import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { APIs } from "../../constraint/API";
import AppContext from "../../Context/AppContext";
import parse from "html-react-parser";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Row,
  Col,
} from "reactstrap";

const BlogShow = () => {
  const history = useHistory();
  const appcontext = useContext(AppContext);
  useEffect(() => {
    appcontext.getAllBlog();
  }, []);
  const toShow = con => {
    let content = parse(con);
    console.log(content);
  };
  return (
    <div>
      <Row>
        {console.log(appcontext)}
        {appcontext.blogs &&
          appcontext.blogs.length &&
          appcontext.blogs.map(b => (
            <Col sm='6'>
              <Card body>
                <CardImg
                  style={{ height: "10%", width: "10%" }}
                  width='50%'
                  src={`${APIs}/uploads/${b.image}`}
                  alt='Card image cap'
                />
                <CardBody>
                  <CardTitle tag='h5'>{b.title}</CardTitle>
                  <CardSubtitle tag='h6' classNa me='mb-2 text-muted'>
                    {b.category}
                  </CardSubtitle>
                  <CardText>{toShow(b.editor)}</CardText>
                  <Button
                    onClick={() => {
                      appcontext.deleteBlog(b._id);
                    }}
                  >
                    Delete
                  </Button>
                  {"   "}
                  <Button
                    onClick={() => {
                      history.push(`/admin/updateblog/${b._id}`);
                    }}
                  >
                    Update
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default BlogShow;
