import React, { useEffect, useState } from "react";
import { allStoreProducts } from "../../services/storeProductService";
import ReactPaginate from "react-paginate";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  CardText,
  CardSubtitle,
  Col,
} from "reactstrap";
const ProductCard = ({ subId, storeId, searchKey, itemsPerPage }) => {
  const [pageCount, setPageCount] = useState(0);
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();

  // We start with an empty list of items.
  var location = document.URL;
  var NewLocation = new URL(location);
  const url = NewLocation.searchParams.get("page");
  const sub = NewLocation.searchParams.get("sub_category_id");
  const store = NewLocation.searchParams.get("store_id");
  const key = NewLocation.searchParams.get("key");

  const fetchData = async (url, sub, store, key) => {
    url = url === null ? 1 : url;
    const a = (sub != null) & (sub != "") ? "&sub_category_id=" + sub : "";
    const b = (store != null) & (store != "") ? "&store_id=" + store : "";
    const c = (key != null) & (key != "") ? "&key=" + key : "";
    const data = await allStoreProducts(url + a + b + c);
    setproducts(Object.values(data.data));
    setPageCount(Math.ceil(data.total / itemsPerPage));
    navigate("/?page=" + url + a + b + c);
  };

  useEffect(() => {
    setTimeout(() => {
      if (Object.keys(products).length === 0) {
        fetchData(url, sub, store, key);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (
      subId != "" ||
      subId.length == 0 ||
      storeId != "" ||
      storeId.length == 0 ||
      searchKey != "" ||
      searchKey.length == 0
    ) {
      fetchData(1, subId, storeId, searchKey);
    }
  }, [subId, storeId, searchKey]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchData(event.selected + 1, sub, store, key);
  };

  return (
    <>
      {products !== {} &&
        products?.map((product) => (
          <Col key={product.id}>
            <Card
              style={{
                width: "17rem",
                height: "30rem",
              }}
            >
              <div
                id={"carouselExampleControls" + product.id}
                className="carousel slide"
                data-bs-interval="false"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active ">
                    <img
                      alt="Sample"
                      src={
                        "http://127.0.0.1:8000/product_images/" +
                        product?.photos[0].path
                      }
                      style={{
                        width: "17rem",
                        height: "17rem",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      alt="Sample"
                      src={
                        "http://127.0.0.1:8000/product_images/" +
                        product?.photos[1].path
                      }
                      style={{
                        width: "17rem",
                        height: "17rem",
                      }}
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      alt="Sample"
                      src={
                        "http://127.0.0.1:8000/product_images/" +
                        product?.photos[2].path
                      }
                      style={{
                        width: "17rem",
                        height: "17rem",
                      }}
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target={"#carouselExampleControls" + product.id}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target={"#carouselExampleControls" + product.id}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <CardBody
                style={{
                  width: "17rem",
                  height: "1rem",
                }}
              >
                <CardTitle tag="h4">{product.name}</CardTitle>
                <CardSubtitle className="my-2 text-muted" tag="h5">
                  {product.product_store[0].info.price + "$"}
                </CardSubtitle>

                <CardText>
                  {"Store Name: " + product.product_store[0].name}
                </CardText>
              </CardBody>
              <div className="d-flex justify-content-center">
                <NavLink to={"product/" + product.id}>
                  <Button className="btn btn-success mb-3">View</Button>
                </NavLink>
              </div>
            </Card>
          </Col>
        ))}
      <Col md={10} className="mt-3 d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </Col>
    </>
  );
};

export default ProductCard;
