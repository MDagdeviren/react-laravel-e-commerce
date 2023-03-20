import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProducts } from "../../features/productSlice";
import { getCategories } from "../../features/categorySlice";
import { getSubCategories } from "../../features/subCategorySlice";
import { postStoreProduct } from "../../features/storeProductSlice";
import {
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import EditProductModal from "./EditProductModal";
const StoreProductManagement = () => {
  const [open, setOpen] = useState("0");

  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const categories = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategory);
  const products = useSelector((state) => state.product);
  const storeProducts = useSelector((state) => state.storeProduct);

  useEffect(() => {
    if (open !== "0") {
      if (Object.keys(categories).length === 0) {
        dispatch(getCategories());
      }
      if (Object.keys(subCategories).length === 0) {
        dispatch(getSubCategories());
      }
      if (Object.keys(products).length === 0) {
        dispatch(getProducts());
      }
    }
  }, [open]);

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [control, setcontrol] = useState(false);
  const handleChangeCategory = (event) => {
    setSelectedCategoryId(event.target.value);
  };
  const handleChangeSubCategory = (event) => {
    setSelectedSubCategoryId(event.target.value);
  };
  const handleChangeProduct = (event) => {
    setSelectedProductId(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputFields);

    dispatch(postStoreProduct(inputFields)).then(
      (data) => {
        setInputFields([
          {
            category_id: 0,
            sub_category_id: 0,
            product_id: 0,
            store_id: token.user.store_id,

            price: 0,
            stock: 0,
          },
        ]);
        console.log(data);
        toast.success("Added Product(s)");
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const [inputFields, setInputFields] = useState([
    {
      category_id: 0,
      sub_category_id: 0,
      product_id: 0,
      store_id: token.user.store_id,

      price: 0,
      stock: 0,
    },
  ]);

  function addClick() {
    let newField = {
      category_id: 0,
      sub_category_id: 0,
      product_id: 0,
      store_id: token.user.store_id,

      price: 0,
      stock: 0,
    };

    setInputFields([...inputFields, newField]);
  }
  const removeFields = (index) => {
    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };
  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  return (
    <div>
      <Accordion open={open} toggle={toggle}>
        {token.user.user_level === 1 && (
          <AccordionItem>
            <AccordionHeader targetId="1">Add Product</AccordionHeader>
            <AccordionBody accordionId="1">
              <h4>Add Product</h4>
              {inputFields.length === 0 && (
                <Button
                  color="success"
                  className="ms-2 mt-4"
                  onClick={addClick}
                >
                  Add
                </Button>
              )}

              <Form onSubmit={handleSubmit}>
                {inputFields.map((input, index) => (
                  <div key={index}>
                    <Row>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="exampleSelect">Category</Label>

                          <Input
                            id="exampleSelect"
                            name="category_id"
                            type="select"
                            value={input.category_id}
                            onChange={(event) => handleFormChange(index, event)}
                          >
                            <option hidden>Select</option>
                            {categories?.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </Input>
                        </FormGroup>
                      </Col>
                      {input.category_id > 0 && (
                        <Col md={2}>
                          <FormGroup>
                            <Label for="exampleSelect2">Category2</Label>

                            <Input
                              id="exampleSelect2"
                              name="sub_category_id"
                              type="select"
                              value={input.sub_category_id}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            >
                              <option hidden>Select</option>
                              {subCategories.map(
                                (subCategory) =>
                                  parseInt(input.category_id) ===
                                    subCategory.category_id && (
                                    <option
                                      key={subCategory.id}
                                      value={subCategory.id}
                                    >
                                      {subCategory.name}
                                    </option>
                                  )
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                      )}
                      {input.sub_category_id > 0 && (
                        <Col md={2}>
                          <FormGroup>
                            <Label for="exampleSelect3">Product</Label>

                            <Input
                              id="exampleSelect3"
                              name="product_id"
                              type="select"
                              value={input.product_id}
                              onChange={(event) =>
                                handleFormChange(index, event)
                              }
                            >
                              <option hidden>Select</option>
                              {products.map(
                                (product) =>
                                  parseInt(input.sub_category_id) ===
                                    product.sub_category_id && (
                                    <option key={product.id} value={product.id}>
                                      {product.name}
                                    </option>
                                  )
                              )}
                            </Input>
                          </FormGroup>
                        </Col>
                      )}
                      <Col md={2}>
                        <FormGroup>
                          <Label for="price">Price</Label>

                          <Input
                            min={0}
                            id="price"
                            name="price"
                            type="number"
                            step=".01"
                            value={input.price}
                            onChange={(event) => handleFormChange(index, event)}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
                        <FormGroup>
                          <Label for="stock">Stock</Label>

                          <Input
                            min={0}
                            id="stock"
                            name="stock"
                            type="number"
                            value={input.stock}
                            onChange={(event) => handleFormChange(index, event)}
                          />
                        </FormGroup>
                      </Col>

                      <Col md={2}>
                        <FormGroup row>
                          <Label for="add"></Label>
                          <Col md={6}>
                            <Button
                              color="danger"
                              className="mt-4"
                              onClick={() => removeFields(index)}
                            >
                              Remove
                            </Button>
                          </Col>
                          <Col md={6}>
                            {input.category_id > 0 &&
                              input.sub_category_id > 0 &&
                              input.product_id > 0 &&
                              input.stock > 0 &&
                              input.price > 0 && (
                                <Button
                                  color="success"
                                  className="ms-2 mt-4"
                                  onClick={addClick}
                                >
                                  Add
                                </Button>
                              )}
                          </Col>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <FormGroup>
                      <Input
                        id="storeID"
                        name="store_id"
                        type="number"
                        defaultValue={token.user.store_id}
                        hidden
                      />
                    </FormGroup> */}
                  </div>
                ))}

                <FormGroup>
                  <Button>Submit</Button>
                </FormGroup>
              </Form>
            </AccordionBody>
          </AccordionItem>
        )}

        <AccordionItem>
          <AccordionHeader targetId="2">Product Table</AccordionHeader>
          <AccordionBody accordionId="2">
            <EditProductModal />
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default StoreProductManagement;
