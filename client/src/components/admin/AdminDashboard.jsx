import React, { useState } from "react";
import CategoryManagement from "./CategoryManagement";
import ProductManagement from "./ProductManagement";
import StoreManagement from "./StoreManagement";

import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";

const AdminDashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={activeTab == "1" ? "active" : ""}
            onClick={() => setActiveTab("1")}
          >
            Store Management
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "2" ? "active" : ""}
            onClick={() => setActiveTab("2")}
          >
            Category Management
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab == "3" ? "active" : ""}
            onClick={() => setActiveTab("3")}
          >
            Product Management
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <StoreManagement />
        </TabPane>
        <TabPane tabId="2">
          <CategoryManagement />
        </TabPane>
        <TabPane tabId="3">
          <ProductManagement />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default AdminDashboard;
