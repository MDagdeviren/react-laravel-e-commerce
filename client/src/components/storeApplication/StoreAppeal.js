import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  CardHeader,
} from "reactstrap";
import {
  postStoreAppeal,
  getStoreAppeal,
  deleteStoreAppeal,
} from "../../features/storeAppealSlice";
import EditModal from "./EditModal";
const StoreAppeal = () => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem("token"));
  const [value, setValue] = useState("");
  const item = {
    user_id: token.user.id,
  };
  const store = useSelector((state) => state.storeAppeal);
  useEffect(() => {
    dispatch(getStoreAppeal(item)).then(
      () => {},
      (err) => {}
    );
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.append("phone_number", value);
    dispatch(postStoreAppeal(data)).then(
      (data) => {
        toast.success("A store opening request has been sent.");
      },
      (err) => {}
    );
  }
  function prettyDate(time) {
    var date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " ")),
      diff = (new Date().getTime() - date.getTime()) / 1000,
      day_diff = Math.floor(diff / 86400);

    if (isNaN(day_diff) || day_diff < 0 || day_diff >= 31) return;

    return (
      (day_diff == 0 &&
        ((diff < 60 && "just now") ||
          (diff < 120 && "1 minute ago") ||
          (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
          (diff < 7200 && "1 hour ago") ||
          (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
      (day_diff == 1 && "Yesterday") ||
      (day_diff < 7 && day_diff + " days ago") ||
      (day_diff < 31 && Math.ceil(day_diff / 7) + " weeks ago")
    );
  }
  function handleEdit(event) {}
  function handleDelete() {
    dispatch(deleteStoreAppeal({ id: store.id })).then(
      (data) => {
        toast.success("A store opening request deleted");
      },
      (err) => {}
    );
  }
  return (
    <div className="container mt-4 mb-4">
      {store.id ? (
        <div className="m-5 d-flex justify-content-center">
          <Card
            style={{
              width: "18rem",
            }}
            className="m-1"
          >
            <CardHeader className="text-center">
              Waiting for Appeal....
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">{store.name}</CardTitle>
              <CardText>{store.email}</CardText>
              <CardText>{store.address}</CardText>
              <CardText>{store.phone_number}</CardText>
              <CardText>
                <small className="text-muted">
                  {prettyDate(store.created_at)}
                </small>
              </CardText>
            </CardBody>
            <EditModal store={store} type="appeal" />
            <Button onClick={handleDelete} className="btn btn-danger mt-2 ">
              DELETE
            </Button>
          </Card>
        </div>
      ) : (
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
            <Col md={6}>
              <FormGroup>
                <Input
                  id="userID"
                  hidden
                  name="user_id"
                  defaultValue={token.user.id}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button>Send</Button>
        </Form>
      )}
    </div>
  );
};

export default StoreAppeal;
