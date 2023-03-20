import React, { useState, useEffect } from "react";
import { Form, Row, Col, FormGroup, Label, Input, Button } from "reactstrap";
import PhoneInput from "react-phone-number-input";
//-----------------------------------------------------out of use--------------------------------------------------------------
const FormAppeal = ({ handleSubmit, token }) => {
  const [value, setValue] = useState("");

  console.log(token);
  return (
    <>
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
    </>
  );
};

export default FormAppeal;
