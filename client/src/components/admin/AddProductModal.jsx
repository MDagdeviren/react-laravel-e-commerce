import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { postProduct } from "../../features/productSlice";
import {
  Input,
  Label,
  Form,
  FormGroup,
  Col,
  FormText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

const AddProductModal = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategory);
  const [modal, setModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState();
  const [obj, setobj] = useState({});

  const toggle = () => setModal(!modal);

  const handleChangeCategory = (event) => {
    setSelectedCategoryId(event.target.value);
  };

  const handleChangeSubCategory = (event) => {
    setSelectedSubCategoryId(event.target.value);
  };

  const imageHandleChange = (e) => {
    setSelectedImages([]);
    if (selectedTarget) {
      const fileArray = Array.from(selectedTarget).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(selectedTarget).map((file) => URL.revokeObjectURL(file));
    }
    setobj(Object.assign({}, selectedTarget));
  };

  const renderPhotos = (source) => {
    return source.map((photo, i) => {
      return (
        <img
          id={i}
          src={photo}
          key={i}
          style={{
            height: 120,
          }}
          alt={photo}
          onClick={onClickChange}
        />
      );
    });
  };
  useEffect(() => {
    imageHandleChange();
  }, [selectedTarget]);

  const onClickChange = (e) => {
    const data = Array.from(selectedTarget).filter(
      (img, i) => i == e.target.id && img
    );
    const data2 = Array.from(selectedTarget).filter(
      (img, i) => i != e.target.id && img
    );
    setSelectedTarget(data.concat(data2));
    setobj(Object.assign({}, selectedTarget));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    data.delete("fileName[]");
    data.append("fileName[0]", obj[0]);
    data.append("fileName[1]", obj[1]);
    data.append("fileName[2]", obj[2]);

    dispatch(postProduct(data)).then(
      (data) => {
        toggle();
        toast.success("Added " + data.payload.name + " Product");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const addClick = () => {
    toggle();
  };
  return (
    <div>
      <div className="d-grid gap-1 d-md-flex justify-content-md-end">
        <Button
          id="addBtn"
          className=" mt-2 me-md-3"
          color="success"
          onClick={addClick}
        >
          Add
        </Button>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add Product</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="exampleSelect" sm={2}>
                Category
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleSelect"
                  name="category_id"
                  type="select"
                  value={selectedCategoryId}
                  onChange={handleChangeCategory}
                >
                  <option hidden>Select</option>
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            {selectedCategoryId > 0 && (
              <FormGroup row>
                <Label for="exampleSelect2" sm={2}>
                  Category2
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleSelect2"
                    name="sub_category_id"
                    type="select"
                    value={selectedSubCategoryId}
                    onChange={handleChangeSubCategory}
                  >
                    <option hidden>Select</option>
                    {subCategories.map(
                      (subCategory) =>
                        parseInt(selectedCategoryId) ===
                          subCategory.category_id && (
                          <option key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                          </option>
                        )
                    )}
                  </Input>
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label for="product" sm={2}>
                Product
              </Label>
              <Col sm={10}>
                <Input id="product" name="name" type="text" bsSize="" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleText" sm={2}>
                Description
              </Label>
              <Col sm={10}>
                <Input id="exampleText" name="description" type="textarea" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="exampleFile" sm={2}>
                File
              </Label>
              <Col sm={10}>
                <Input
                  id="exampleFile"
                  multiple
                  name="fileName[]"
                  type="file"
                  onChange={(e) =>
                    setSelectedTarget(Object.values(e.target.files))
                  }
                  accept="image/*"
                />
                {renderPhotos(selectedImages)}
                {/* <FormText>
              This is some placeholder block-level help text for the above
              input. It‘s a bit lighter and easily wraps to a new line.
            </FormText> */}
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col
                sm={{
                  offset: 9,
                  size: 10,
                }}
              >
                <Button>Submit</Button>
              </Col>
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

export default AddProductModal;
