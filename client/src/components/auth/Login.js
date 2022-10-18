import React, { useState } from "react";
import LoginForm from "../toolbox/Loginform";
import { login } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import AuthValidations from "../../validations/AuthValidations";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: AuthValidations.login,
      onSubmit: (values) => {
        const item = {
          email: values.email,
          password: values.password,
          format: "login",
        };
        dispatch(login(item))
          .unwrap()
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            // console.log("hata");
          });
      },
    });
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const item = {
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   };

  //   dispatch(login(item))
  //     .unwrap()
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch(() => {});
  // }
  return (
    <div>
      <LoginForm
        handleSubmit={handleSubmit}
        onChange={handleChange}
        values={values}
        handleBlur={handleBlur}
        errors={errors}
        touched={touched}
      />
    </div>
  );
};

export default Login;
