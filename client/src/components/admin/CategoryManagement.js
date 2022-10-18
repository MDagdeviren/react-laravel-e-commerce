import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategories,
  postCategory,
  putCategory,
  deleteCategory,
} from "../../features/categorySlice";
import {
  getSubCategories,
  postSubCategory,
  putSubCategory,
  deleteSubCategory,
} from "../../features/subCategorySlice";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Input,
  Label,
  Form,
  FormGroup,
  Table,
} from "reactstrap";
const CategoryManagemet = (args) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    console.log("test");
  }, []);
  const categories = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategory);
  // console.log(subCategories);
  const [modal, setModal] = useState(false);
  const [open, setOpen] = useState("1");
  const toggle = () => setModal(!modal);
  const togglea = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  const [currentCategory, setCurrentCategory] = useState("");
  const [currentSubCategory, setCurrentSubCategory] = useState("");
  const [currentBtn, setCurrentBtn] = useState("");
  const [categoryId, setcategoryId] = useState(null);
  const [subcategoryId, setsubcategoryId] = useState(null);

  //EditClick
  function editClick(event, category, subCategory) {
    toggle();
    setCurrentBtn("Edit");
    setCurrentCategory(category.name);
    setCurrentSubCategory(subCategory.name);
    setcategoryId(category.id);
    setsubcategoryId(subCategory.id);
  }
  //Add Click
  function addClick(event) {
    toggle();
    setCurrentBtn("Add");
    setCurrentCategory("");
    setCurrentSubCategory("");
  }
  // console.log(result);
  function handleSubmitMain(event) {
    event.preventDefault();
    if (currentBtn === "Add") {
      const data = new FormData(event.currentTarget);
      const item = {
        name: data.get("name"),
      };
      console.log(item);
      dispatch(postCategory(item)).then(
        (data) => {
          toggle();
          console.log(data);
          toast.success("Added " + data.payload.name + " Category");
        },
        (err) => {}
      );
    } else if (currentBtn === "Edit") {
      const data = new FormData(event.currentTarget);
      const item = {
        id: categoryId,
        name: data.get("name"),
      };
      dispatch(putCategory(item)).then(
        (data) => {
          toggle();
          toast.success("Updated as " + data.payload.name + " Category");
        },
        (err) => {}
      );
    }
  }
  function handleSubmitSub(event) {
    event.preventDefault();
    if (currentBtn === "Add") {
      const data = new FormData(event.currentTarget);
      const item = {
        category_id: parseInt(data.get("select")),
        name: data.get("name"),
      };
      dispatch(postSubCategory(item)).then((data) => {
        toggle();
        toast.success("Added " + data.payload.name + " Sub Category");
      });
      // .catch((message) => {
      //   toast.warning("Failed:" + message);
      //   console.log(message);
      // });
    } else if (currentBtn === "Edit") {
      const data = new FormData(event.currentTarget);
      const item = {
        id: subcategoryId,
        name: data.get("name"),
      };
      dispatch(putSubCategory(item)).then(
        (data) => {
          toggle();
          toast.success("Updated as " + data.payload.name + " Sub Category");
        },
        (err) => {}
      );
    }
  }
  function categoryDel(e) {
    e.preventDefault();
    const item = {
      id: categoryId,
    };
    dispatch(deleteCategory(item)).then(
      (data) => {
        toggle();
        toast.success("Deleted " + data.payload.name + " Category");
      },
      (err) => {}
    );
  }
  function subCategoryDel(e) {
    e.preventDefault();
    const item = {
      id: subcategoryId,
    };
    dispatch(deleteSubCategory(item)).then(
      (data) => {
        toggle();
        toast.success("Deleted " + data.payload.name + " Sub Category");
      },
      (err) => {}
    );
  }
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
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
          <Accordion open={open} toggle={togglea}>
            <AccordionItem>
              <AccordionHeader className="edit-acc" targetId="1">
                {currentBtn === "Add" ? "Add Category" : "Edit Category"}
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Form onSubmit={handleSubmitMain}>
                  <FormGroup>
                    <Label for="category">Category Name</Label>
                    <Input
                      id="category"
                      name="name"
                      type="text"
                      bsSize=""
                      value={currentCategory}
                      onChange={(e) => {
                        setCurrentCategory(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                  {currentBtn === "Edit" && (
                    <Button
                      onClick={categoryDel}
                      className="ms-2"
                      color="danger"
                    >
                      Delete
                    </Button>
                  )}
                </Form>
              </AccordionBody>
            </AccordionItem>
            <AccordionItem>
              <AccordionHeader className="edit-acc" targetId="2">
                {currentBtn === "Add"
                  ? "Add Sub Category"
                  : "Edit Sub Category"}
              </AccordionHeader>
              <AccordionBody accordionId="2">
                <Form onSubmit={handleSubmitSub}>
                  {currentBtn === "Add" && (
                    <FormGroup>
                      <Label for="exampleSelect">Category</Label>
                      <Input id="exampleSelect" name="select" type="select">
                        {categories?.map((category, key) => (
                          <option value={category.id} key={key}>
                            {category.name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}
                  <FormGroup>
                    <Label for="subCategory">Sub Category Name</Label>
                    <Input
                      id="subCategory"
                      name="name"
                      type="text"
                      bsSize=""
                      value={currentSubCategory}
                      onChange={(e) => {
                        setCurrentSubCategory(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                  {currentBtn === "Edit" && (
                    <Button
                      onClick={subCategoryDel}
                      className="ms-2"
                      color="danger"
                    >
                      Delete
                    </Button>
                  )}
                </Form>
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Sub Category</th>
            <th>Parent Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subCategories?.map((subCategory, key) =>
            categories?.map(
              (category) =>
                subCategory.category_id === category.id && (
                  <tr key={key}>
                    <th scope="row">{key + 1}</th>
                    <td>{subCategory.name}</td>
                    <td>{category.name}</td>
                    <td>
                      {" "}
                      <Button
                        sub_category_id={subCategory.id}
                        category_id={category.id}
                        id="editBtn"
                        color="info"
                        onClick={(e) => editClick(e, category, subCategory)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                )
            )
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManagemet;
