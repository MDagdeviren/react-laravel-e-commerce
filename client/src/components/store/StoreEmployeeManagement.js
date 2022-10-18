import React, { useEffect, useState } from "react";
import storeEmployeeService from "../../services/storeEmployeeService";
import { Table, Button, Form, FormGroup, Input, Label } from "reactstrap";
import { toast } from "react-toastify";

function StoreEmployeeManagement() {
  const token = JSON.parse(localStorage.getItem("token"));
  const item = {
    store_id: token.user.store_id,
  };
  const [employees, setEmployee] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await storeEmployeeService.getEmployees(item);
      setEmployee(data);
      //   console.log(data);
    };
    if (Object.keys(employees).length === 0) {
      fetchData();
    }
  }, []);
  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fetchData = async () => {
      return await storeEmployeeService.postEmployee(formData);
    };
    fetchData().then((response) => {
      toast.success("Mail sent");
      console.log(response);
    });
  }
  return (
    <div>
      <Form className="container" inline onSubmit={onSubmit}>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label className="me-sm-2" for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="email"
            placeholder="Email address"
            type="email"
          />
        </FormGroup>
        <FormGroup className="mb-2 me-sm-2 mb-sm-0">
          <Label className="me-sm-2" for="exampleEmail">
            Email
          </Label>
          <Input
            id="exampleEmail"
            name="id"
            defaultValue={token.user.id}
            type="number"
            hidden
          />
        </FormGroup>
        <Button color="success">Add Employee</Button>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, key) => (
            <tr key={employee.id}>
              <th scope="row">{key + 1}</th>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.user_level === 1 ? "Owner" : "Employee"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default StoreEmployeeManagement;
