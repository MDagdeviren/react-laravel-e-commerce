import React from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col,
  Button,
  CardGroup,
  CardSubtitle,
} from "reactstrap";
const CardAdmin = () => {
  const products = useSelector((state) => state.product);
  function editClick(e, product) {}
  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product.id} sm="4">
            <Card body>
              <Row xs="3">
                <Col>
                  <CardImg
                    alt={product.name}
                    src={
                      "http://127.0.0.1:8000/product_images/" +
                      product?.photos[0].path
                    }
                    style={{
                      width: "5rem",
                      heigt: "5rem",
                    }}
                  />
                </Col>
                <Col>
                  <CardImg
                    alt={product.name}
                    src={
                      "http://127.0.0.1:8000/product_images/" +
                      product?.photos[1].path
                    }
                    style={{
                      width: "5rem",
                      heigt: "5rem",
                    }}
                  />
                </Col>
                <Col>
                  <CardImg
                    alt={product.name}
                    src={
                      "http://127.0.0.1:8000/product_images/" +
                      product?.photos[2].path
                    }
                    style={{
                      width: "5rem",
                      heigt: "5rem",
                    }}
                  />
                </Col>
              </Row>

              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardText>{product.description}</CardText>
              <Button onClick={(e) => editClick(e, product)}>Edit</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CardAdmin;
