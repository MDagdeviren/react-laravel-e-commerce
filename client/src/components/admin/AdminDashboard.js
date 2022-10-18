import React, { useState, useEffect } from "react";
import CategoryManagement from "./CategoryManagement";
import ProductManagement from "./ProductManagement";
import StoreManagement from "./StoreManagement";
import { ToastContainer } from "react-toastify";

import { Nav, NavItem, NavLink, TabPane, TabContent } from "reactstrap";
function AdminDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const [activeTab, setActiveTab] = useState("1");
  return (
    <div>
      {/* <Row xs="6">
        <Navbar className="my-2" color="dark" dark>
          <Nav vertical pills>
            <NavItem className="mt-4">
              <NavLink active href="/admin/store">
                Store Management
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Category Management</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">Product Management</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#">*******</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </Row> */}
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
}

export default AdminDashboard;
