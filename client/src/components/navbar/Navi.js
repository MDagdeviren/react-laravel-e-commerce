import React, { useState, useEffect } from "react";
import { logout } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NavLink } from "reactstrap";
import { allStoreProducts } from "../../services/storeProductService";

const Example = (args) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  //Search
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  function handleLogout() {
    dispatch(logout())
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(() => {});
  }

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              alt="logo"
              src="https://seeklogo.com/images/F/fenerbahce-spor-kulubu-5-sari-yildizli-arma-logo-05A7043388-seeklogo.com.png"
              style={{
                height: 50,
                width: 50,
              }}
            />
          </a>
          <a className="navbar-brand" href="/">
            N20
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {token?.user.user_level === 0 ? (
                <li class="nav-item">
                  <NavLink active href="/admin">
                    Admin Dashboard
                  </NavLink>
                </li>
              ) : null}
              {token ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {token?.user.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {token.user.store_id ? (
                      <li>
                        <NavLink
                          className="btn"
                          style={{ color: "black" }}
                          href="/store"
                        >
                          Store Management
                        </NavLink>
                      </li>
                    ) : null}
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink
                        style={{ color: "black" }}
                        onClick={handleLogout}
                        className="btn"
                      >
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <ul>
                    <NavLink className="btn" href="/login">
                      Login
                    </NavLink>
                  </ul>
                  <ul>
                    <NavLink className="btn" href="/register">
                      Register
                    </NavLink>
                  </ul>
                </>
              )}
            </ul>
            <form onSubmit={handleSubmit} className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Example;
