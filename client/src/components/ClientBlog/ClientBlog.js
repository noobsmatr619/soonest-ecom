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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const ClientBlog = () => {
  const history = useHistory();
  const appcontext = useContext(AppContext);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    appcontext.getAllBlog();
  }, []);
  const toShow = con => {
    let content = parse(con);
    return content;
  };
  return (
    <div>
      <Row>
        {console.log(appcontext)}
        {appcontext.blogs &&
          appcontext.blogs.length &&
          appcontext.blogs.map(b => (
            <>
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
                    <CardText>.</CardText>
                    <Button onClick={toggle}>Read Detail</Button>
                    {"   "}
                  </CardBody>
                </Card>
              </Col>
              <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{b.title}</ModalHeader>
                <ModalBody>{toShow(b.editor)}</ModalBody>
                <ModalFooter>
                  <Button color='secondary' onClick={toggle}>
                    Close
                  </Button>
                </ModalFooter>
              </Modal>
            </>
          ))}
      </Row>
      <div></div>
    </div>
  );
};
export default ClientBlog;
