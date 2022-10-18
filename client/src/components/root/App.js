import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Home from "../dashboard/Home";
import Navi from "../navbar/Navi";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PrivateRoute from "../PrivateRoute/privateRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "../toolbox/Footer";
import AdminDashboard from "../admin/AdminDashboard";
import AdminRoute from "../PrivateRoute/AdminRoute";
import AuthRoute from "../PrivateRoute/AuthRoute";
import StoreAppeal from "../storeApplication/StoreAppeal";
import OwnerRoute from "../PrivateRoute/OwnerRoute";
import Store from "../store/Store";
import ProductInfo from "../dashboard/ProductInfo";
function App() {
  const currentUser = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log(currentUser);

  return (
    <div>
      <Router>
        <Navi />
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/appeal" element={<StoreAppeal />}></Route>
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboard />}></Route>
          </Route>
          <Route element={<OwnerRoute />}>
            <Route path="/store" element={<Store />}></Route>
          </Route>
          <Route path="/*" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductInfo />}></Route>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
