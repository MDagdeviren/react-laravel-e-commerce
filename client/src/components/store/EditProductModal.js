import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  putStoreProduct,
  deleteStoreProduct,
} from "../../features/storeProductSlice";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Table,
} from "reactstrap";
const EditProductModal = () => {
  const dispatch = useDispatch();
  const storeProducts = useSelector((state) => state.storeProduct);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [currentProductPrice, setcurrentProductPrice] = useState("");
  const [currentProductStock, setcurrentProductStock] = useState("");
  const [currentProductId, setcurrentProductId] = useState("");
  const [currentName, setcurrentName] = useState("");
  function onClick(e, product) {
    toggle();
    setcurrentProductId(product.id);
    setcurrentProductPrice(product.price);
    setcurrentProductStock(product.stock);
    setcurrentName(product.product.name);
  }
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = {
      id: parseInt(data.get("product_id")),
      price: data.get("price"),
      stock: data.get("stock"),
    };
    dispatch(putStoreProduct(item)).then(
      (data) => {
        toggle();
        toast.success("Updated " + data.payload.product.name + " Product");
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function handleDelete() {
    dispatch(deleteStoreProduct({ id: currentProductId })).then(
      (data) => {
        toggle();
        toast.success("Deleted " + currentName + " Product");
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <div>
      <div className="container">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {storeProducts.map((product, key) => (
              <tr key={product.id}>
                <th scope="row">{key + 1}</th>
                <td>{product.product.name}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Button
                    color="info"
                    onClick={(e) => {
                      onClick(e, product);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="exampleName" sm={2}>
                Product
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleName"
                  name="name"
                  type="text"
                  value={currentName}
                  disabled
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleprice" sm={2}>
                Price
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleprice"
                  name="price"
                  type="number"
                  step=".01"
                  value={currentProductPrice}
                  onChange={(e) => {
                    setcurrentProductPrice(e.target.value);
                  }}
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="examplestock" sm={2}>
                Stock
              </Label>
              <Col sm={10}>
                <Input
                  id="examplestock"
                  name="stock"
                  type="number"
                  value={currentProductStock}
                  onChange={(e) => {
                    setcurrentProductStock(e.target.value);
                  }}
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={10}>
                <Input
                  id="id"
                  name="product_id"
                  type="number"
                  defaultValue={currentProductId}
                  hidden
                ></Input>
              </Col>
            </FormGroup>
            <FormGroup>
              <Button type="submit" className="btn btn-success">
                Update
              </Button>
              <Button onClick={handleDelete} className="btn btn-danger ms-2">
                Delete
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProductModal;
