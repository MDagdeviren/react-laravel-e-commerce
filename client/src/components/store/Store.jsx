import React, { useState, useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";

import { getStoreProducts } from "../../features/storeProductSlice";

import "./index.css";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from "reactstrap";
import StoreProductManagement from "./StoreProductManagement";

import StoreEmployeeManagement from "./StoreEmployeeManagement";
const StoreCover = React.lazy(() => import("./StoreCover"));

const Store = () => {
  const [activeTab, setActiveTab] = useState("1");
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    dispatch(getStoreProducts({ store_id: token.user.store_id }));
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <StoreCover />
      </Suspense>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            <Button>Product Management</Button>
          </NavLink>
        </NavItem>
        <NavItem>
          {token.user.user_level === 1 && (
            <NavLink
              className={activeTab == "2" ? "active" : ""}
              onClick={() => setActiveTab("2")}
            >
              <Button>Employee Management</Button>
            </NavLink>
          )}
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <StoreProductManagement />
        </TabPane>
        <TabPane tabId="2">
          <StoreEmployeeManagement />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Store;
