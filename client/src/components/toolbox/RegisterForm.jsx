import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./toolbox.css";
import { clearMessage } from "../../features/messageSlice";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";

const RegisterForm = ({ handleSubmit }) => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  return (
    <div className="auth">
      <h2 className="text-center">Register</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleName">Username</Label>
          <Input
            type="text"
            name="name"
            id="exampleName"
            autoComplete="off"
            placeholder="Name"
          />
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
            autoComplete="off"
          />
        </FormGroup>
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            autoComplete="off"
          />
        </FormGroup>
        {message && (
          <FormGroup>
            <Alert color="danger">{message}</Alert>
          </FormGroup>
        )}
        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
