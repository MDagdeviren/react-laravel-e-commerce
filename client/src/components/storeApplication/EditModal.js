import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { putStoreAppeal } from "../../features/storeAppealSlice";
import { putStore } from "../../features/storeInfoSlice";
import { toast } from "react-toastify";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
} from "reactstrap";
import PhoneInput from "react-phone-number-input";

function EditModal({ store, type }) {
  const dispatch = useDispatch();

  // const store = useSelector((state) => state.storeAppeal);

  const token = JSON.parse(localStorage.getItem("token"));
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [value, setValue] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("phone_number", value);
    console.log(data.get("name"));
    if (type === "appeal") {
      dispatch(putStoreAppeal(data)).then(
        () => {
          toggle();
          toast.success("Updated store information");
        },
        (err) => {}
      );
    } else {
      dispatch(putStore(data)).then(
        () => {
          toggle();
          toast.success("Updated store information");
        },
        (err) => {}
      );
    }
  }
  // {...args}
  return (
    <div>
      <Button className="btn btn-info mt-3" onClick={toggle}>
        EDIT
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleName">Store Name</Label>
                  <Input
                    id="exampleName"
                    name="name"
                    placeholder="Store Name..."
                    type="string"
                    defaultValue={store.name}
                    // onChange={() => {}}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                    defaultValue={store.email}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleAddress">Address</Label>
              <Input
                id="exampleAddress"
                name="address"
                placeholder="1234 Main St"
                defaultValue={store.address}
              />
            </FormGroup>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="examplePhone">Phone Number</Label>
                  <PhoneInput
                    placeholder="Enter phone number"
                    international={false}
                    defaultCountry="TR"
                    className="form-control"
                    style={{ display: "flex" }}
                    value={value}
                    onChange={setValue}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Input
                id="storeID"
                name="id"
                hidden
                placeholder="1234 Main St"
                defaultValue={store.id}
              />
            </FormGroup>

            <Button>Send</Button>
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
}

export default EditModal;
