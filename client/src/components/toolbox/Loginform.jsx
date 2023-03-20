import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./toolbox.css";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import { clearMessage } from "../../features/messageSlice";
const Loginform = ({
  handleSubmit,
  onChange,
  values,
  handleBlur,
  errors,
  touched,
}) => {
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);
  return (
    <div className="auth">
      <h2 className="text-center">Sign In</h2>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Email</Label>
          <Input
            type="email"
            name="email"
            id="exampleEmail"
            placeholder="example@example.com"
            onChange={onChange}
            value={values.email}
            onBlur={handleBlur}
            autoComplete="on"
          />
        </FormGroup>

        {errors.email && touched.email && (
          <Alert color="danger">{errors.email}</Alert>
        )}
        <FormGroup>
          <Label for="examplePassword">Password</Label>
          <Input
            type="password"
            name="password"
            id="examplePassword"
            placeholder="********"
            onChange={onChange}
            value={values.password}
            onBlur={handleBlur}
            autoComplete="on"
          />
        </FormGroup>
        {errors.password && touched.password && (
          <Alert color="danger">{errors.password}</Alert>
        )}

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

export default Loginform;
