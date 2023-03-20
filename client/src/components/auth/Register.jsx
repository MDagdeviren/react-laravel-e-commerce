import React, { useState } from "react";
import RegisterForm from "../toolbox/RegisterForm";
import { register } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var location = document.URL;
  var newLocation = new URL(location);
  var key = newLocation.searchParams.get("key");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const item = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      key,
    };

    dispatch(register(item))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  };

  return (
    <div>
      <RegisterForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default Register;
