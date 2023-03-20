import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductInfo } from "../../services/productService";
import "./style.css";
import { Container, Row, Col } from "reactstrap";

const ProductInfo = () => {
  var { id } = useParams();
  const [product, setproduct] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductInfo(id);
      setproduct(data);
    };
    fetchData();
  }, []);

  const onClick = (e) => {
    var photos = document.getElementById("photos");
    var main = document.getElementById("main");
    main.src = e.target.src;
    var data = photos.children;
    for (let i = 0; i < data.length; i++) {
      data[i].children[0].classList.remove("opacity");
    }
    e.target.classList.add("opacity");
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={2}></Col>
        <Col md={8}>
          {product && (
            <div className="card mb-3">
              <Row className="m-2">
                <Col md={7}>
                  <img
                    id="main"
                    src={
                      "http://127.0.0.1:8000/product_images/" +
                      product?.photos[0].path
                    }
                    className="img-fluid rounded-start ms-4"
                    alt="..."
                  />

                  <div id="photos" className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={
                          "http://127.0.0.1:8000/product_images/" +
                          product?.photos[0].path
                        }
                        className="img-fluid rounded-start opacity sub-img"
                        alt="..."
                        onClick={(e) => onClick(e)}
                      />
                    </div>
                    <div className="col-md-4">
                      <img
                        src={
                          "http://127.0.0.1:8000/product_images/" +
                          product?.photos[1].path
                        }
                        className="img-fluid rounded-start sub-img"
                        alt="..."
                        onClick={(e) => onClick(e)}
                      />
                    </div>
                    <div className="col-md-4">
                      <img
                        src={
                          "http://127.0.0.1:8000/product_images/" +
                          product?.photos[2].path
                        }
                        className="img-fluid rounded-start sub-img"
                        alt="..."
                        onClick={(e) => onClick(e)}
                      />
                    </div>
                  </div>
                </Col>
                <Col md={5}>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">
                      {product.product_store[0].info.price + "$"}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">
                        {"Store > " + product.product_store[0].name}
                      </small>
                    </p>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Other Stores
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        {product.product_store?.map((store, i) => (
                          <li key={i}>
                            <button className="dropdown-item">
                              {store.name + ">" + store.info.price + "$"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="btn btn-success mt-4">
                      Add To Cart
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Col>
        <Col md={2}></Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
