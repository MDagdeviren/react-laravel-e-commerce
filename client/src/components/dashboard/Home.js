import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/productSlice";
import { getCategories } from "../../features/categorySlice";
import { getSubCategories } from "../../features/subCategorySlice";
import ProductCard from "./ProductCard";
import { CardGroup, Container, Row, Col } from "reactstrap";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// const ProductCard = React.lazy(() => import("./ProductCard.js"));
function Home() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategory);
  const products = useSelector((state) => state.product);
  // const [checks, setchecks] = useState(localStorage.getItem("checksub"));
  const [stores, setStores] = useState([]);
  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      dispatch(getCategories());
    }
    if (Object.keys(subCategories).length === 0) {
      dispatch(getSubCategories());
    }
    if (Object.keys(products).length === 0) {
      dispatch(getProducts());
    }
    const checksubs = localStorage.getItem("checksub");
    const chckstore = localStorage.getItem("checkstore");

    setTimeout(() => {
      if (checksubs !== null) {
        Object.values(elRefs)?.forEach((element, i) => {
          if (checksubs.includes(element.value)) {
            element.checked = true;
          }
        });
      }
      if (chckstore !== null) {
        Object.values(storesCheck)?.forEach((element, i) => {
          if (chckstore.includes(element.value)) {
            element.checked = true;
          }
        });
      }
    }, 800);
    //Store List
    axios.get("http://127.0.0.1:8000/api/storeFilter").then((response) => {
      setStores(response.data);
    });
  }, []);
  //Use Ref
  const arrLength = subCategories.length;
  const elRefs = document.getElementsByClassName("sub-check");
  // const elRefs = document.getElementById("flexCheckDefault");

  // localset item with params value
  const [searchParams] = useSearchParams();
  const suburl = searchParams.get("sub_category_id");
  localStorage.setItem("checksub", suburl);

  //Checked sub category id array and string
  const item = Object.values(localStorage.getItem("checksub"));
  // console.log(item);
  for (var i = 0; i < item.length; i++) {
    if (item[i] === ",") {
      item.splice(i, 1);
    }
  }

  const [subchecked, setsubchecked] = useState(
    localStorage.getItem("checksub") == ["null"] ? [] : item
  );
  // console.log(subchecked);
  const [sub, setsub] = useState("");

  const checkChange = (e) => {
    const main_id = e.target.getAttribute("main_id");
    if (!main_id) {
      if (e.target.checked) {
        Object.values(elRefs)?.forEach((element) => {
          if (element.getAttribute("main_id") == e.target.id) {
            element.checked = true;
            subchecked.push(element.value);
          }
        });
      } else {
        Object.values(elRefs)?.forEach((element) => {
          if (element.getAttribute("main_id") == e.target.id) {
            element.checked = false;
            const index = subchecked.indexOf(element.value);
            if (index !== -1) {
              subchecked.splice(index, 1);
            }
          }
        });
      }
    } else {
      if (e.target.checked) {
        subchecked.push(e.target.value);
      } else {
        const index = subchecked.indexOf(e.target.value);
        if (index !== -1) {
          subchecked.splice(index, 1);
        }
      }
    }

    setsub(subchecked.join(","));
  };

  //Store Change
  //store local storage
  const storeurl = searchParams.get("store_id");
  localStorage.setItem("checkstore", storeurl);
  const item2 = Object.values(localStorage.getItem("checkstore"));
  for (var i = 0; i < item2.length; i++) {
    if (item2[i] === ",") {
      item.splice(i, 1);
    }
  }

  // const [subchecked, setsubchecked] = useState(
  //   localStorage.getItem("checksub") == ["null"] ? [] : item
  // );

  const storesCheck = document.getElementsByClassName("store-check");
  const [storeChecked, setStoreChecked] = useState(
    localStorage.getItem("checkstore") == ["null"] ? [] : item2
  );
  const [storeStr, setstoreStr] = useState("");
  const storeChange = (j) => {
    if (storesCheck[j].checked) {
      storeChecked.push(storesCheck[j].value);
    } else {
      const index = storeChecked.indexOf(storesCheck[j].value);
      if (index !== -1) {
        storeChecked.splice(index, 1);
      }
    }
    setstoreStr(storeChecked.join(","));
    // console.log(storeChecked);
    // console.log(storeStr);
  };
  //SEARCH KEY
  const [searchText, setSearchText] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(e.target[0].value);
    // localStorage.setItem("search", e.target[0].value);
  };

  // console.log(sub);
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   axios.get("http://127.0.0.1:8000/api/categoriesHome").then((response) => {
  //     setData(response.data);
  //   });
  // }, []);
  // if (!data) return null;
  // console.log(data);
  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md="2">
            <div className="border mb-2">
              <form onSubmit={handleSearch} className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-info" type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </button>
              </form>
            </div>
            <div className="border">
              <span className="mb-2 badge bg-info text-dark">CATEGORIES</span>
              {categories.map((category, i) => (
                <div className="ms-1" key={i}>
                  <div className="form-check" key={i}>
                    <input
                      // ref={elRefs.current[j]}
                      className="form-check-input category-check"
                      type="checkbox"
                      // value={category.id}
                      id={category.id}
                      onChange={(e) => checkChange(e)}
                    />
                    <label className="form-check-label" htmlFor={category.id}>
                      {category.name}
                    </label>
                  </div>
                  {subCategories.map(
                    (subCategory, j) =>
                      subCategory.category_id === category.id && (
                        <div className="form-check ms-4" key={j}>
                          <input
                            className="form-check-input sub-check"
                            type="checkbox"
                            value={subCategory.id}
                            id={"subcategoryCheck" + j}
                            main_id={category.id}
                            onChange={(e) => checkChange(e)}
                            // onClick={(e) => checkChange(e)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={"subcategoryCheck" + j}
                          >
                            {subCategory.name}
                          </label>
                        </div>
                      )
                  )}
                </div>
              ))}
            </div>
            <div className="border">
              <span className="mb-2 badge bg-info text-dark">STORES</span>
              {stores.map((store, j) => (
                <div className="form-check ms-4" key={j}>
                  <input
                    className="form-check-input store-check"
                    type="checkbox"
                    value={store.id}
                    id={"storeCheck" + j}
                    onChange={() => storeChange(j)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"storeCheck" + j}
                  >
                    {store.name}
                  </label>
                </div>
              ))}
            </div>
          </Col>
          <Col md="10">
            <CardGroup>
              <ProductCard
                subId={sub}
                storeId={storeStr}
                searchKey={searchText}
                itemsPerPage={2}
              />
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;

// <div className="accordion" id="accordionPanelsStayOpenExample">
//               {categories.map((category, i) => (
//                 <div className="accordion-item" key={i}>
//                   <h2
//                     className="accordion-header"
//                     id={"panelsStayOpen-headingOne" + i}
//                   >
//                     <button
//                       style={{ height: "1rem" }}
//                       className="accordion-button collapsed"
//                       type="button"
//                       data-bs-toggle="collapse"
//                       data-bs-target={"#panelsStayOpen-collapseOne" + i}
//                       aria-expanded="true"
//                       aria-controls={"panelsStayOpen-collapseOne" + i}
//                     >
//                       {category.name}
//                     </button>
//                   </h2>
//                   <div
//                     id={"panelsStayOpen-collapseOne" + i}
//                     className="accordion-collapse collapse"
//                     aria-labelledby={"panelsStayOpen-headingOne" + i}
//                   >
//                     <div className="accordion-body">
//                       {subCategories.map(
//                         (subCategory, j) =>
//                           subCategory.category_id === category.id && (
//                             <div className="form-check" key={j}>
//                               <input
//                                 ref={elRefs.current[j]}
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 value={subCategory.id}
//                                 id="flexCheckDefault"
//                                 onChange={() => checkChange(j)}
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor="flexCheckDefault"
//                               >
//                                 {subCategory.name}
//                               </label>
//                             </div>
//                           )
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

// ---------------------------------------------------------------
/* <div>
              {data.map((category, i) => (
                <div key={i}>
                  <div className="form-check" key={i}>
                    <input
                      // ref={elRefs.current[j]}
                      className="form-check-input"
                      type="checkbox"
                      value={category.id}
                      id="flexCheck"
                      // onChange={() => checkChange(j)}
                    />
                    <label className="form-check-label" htmlFor="flexCheck">
                      {category.name}
                    </label>
                    {category.sub_categories.map((subCategory, j) => (
                      <div className="form-check ms-4" key={subCategory.id}>
                        <input
                          ref={elRefs.current[subCategory.id]}
                          className="form-check-input"
                          type="checkbox"
                          value={subCategory.id}
                          id="flexCheckDefault"
                          onChange={() => checkChange(subCategory.id)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          {subCategory.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div> */
