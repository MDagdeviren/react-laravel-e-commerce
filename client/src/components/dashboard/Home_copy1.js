import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/productSlice";
import { getCategories } from "../../features/categorySlice";
import { getSubCategories } from "../../features/subCategorySlice";
import ProductCard from "./ProductCard";
import { CardGroup, Container, Row, Col } from "reactstrap";
import { useSearchParams } from "react-router-dom";
//---------------------------
import List from "./List";
import { status } from "./constants";
import axios from "axios";
// const ProductCard = React.lazy(() => import("./ProductCard.js"));
function Home() {
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  const subCategories = useSelector((state) => state.subCategory);
  const products = useSelector((state) => state.product);
  const [checks, setchecks] = useState(localStorage.getItem("checksub"));
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
    // console.log(checksubs);

    setTimeout(() => {
      if (checksubs !== null) {
        elRefs?.current.forEach((element, i) => {
          if (checksubs.includes(element.current?.value)) {
            element.current.checked = true;
          }
        });
      }
    }, 1000);
  }, []);
  //Use Ref
  const arrLength = subCategories.length;
  const elRefs = React.useRef([]);

  if (elRefs.current.length !== arrLength) {
    // add or remove refs
    elRefs.current = Array(arrLength)
      .fill()
      .map((_, i) => elRefs.current[i] || React.createRef());
  }

  // localset item with params value
  const [searchParams] = useSearchParams();
  const suburl = searchParams.get("sub_category_id");
  localStorage.setItem("checksub", suburl);
  // console.log(suburl);

  // function checkReload() {
  //   const suburl = searchParams.get("sub_category_id");
  //   const length = suburl?.split(",").length;
  //   const arraysub = suburl?.split(",", length);
  //   console.log(arraysub);
  //   console.log(elRefs?.current);
  //   const current = elRefs?.current;
  //   if (arraysub) {
  //     current.forEach((element, i) => {
  //       if (arraysub.includes(element.current?.value)) {
  //         element.current.checked = true;
  //       }
  //     });
  //   }
  // }

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

  const checkChange = (j) => {
    // console.log(elRefs.current[j].current.checked);
    if (elRefs.current[j].current.checked) {
      subchecked.push(elRefs.current[j].current.value);
    } else {
      const index = subchecked.indexOf(elRefs.current[j].current.value);
      if (index !== -1) {
        subchecked.splice(index, 1);
        // localStorage.removeItem("checksub");
      }
    }

    setsub(subchecked.join(","));
  };
  //----------------------------------------------------------------------------------------------------------------------
  const [data, setData] = useState([]);
  const setStatus = (root, status) => {
    root.status = status;
    if (Array.isArray(root.items)) {
      return root.items.forEach((item) => {
        setStatus(item, status);
      });
    }
  };

  const computeStatus = (items) => {
    let checked = 0;
    let indeterminate = 0;

    items.forEach((item) => {
      if (item.status && item.status === status.checked) checked++;
      if (item.status && item.status === status.indeterminate) indeterminate++;
    });

    if (checked === items.length) {
      return status.checked;
    } else if (checked > 0 || indeterminate > 0) {
      return status.indeterminate;
    }
  };

  // Depth-first traversal
  const traverse = (root, needle, status) => {
    let id;
    let items;

    if (Array.isArray(root)) {
      items = root;
    } else {
      id = root.id;
      items = root.items;
    }

    // return if needle is found
    // we don't have to compute the status of the items if root.id === needle
    if (id === needle) {
      return setStatus(root, status);
    }

    if (!items) {
      return root;
    } else {
      items.forEach((item) => traverse(item, needle, status));
      root.status = computeStatus(items);
    }
  };

  const [items, setItems] = useState([]);
  const compute = (checkboxId, status) => {
    traverse(items, checkboxId, status);
    setItems(items.slice());
  };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categoriesHome").then((response) => {
      setData(response.data);
      setItems(response.data);
    });
  }, []);
  if (!data) return null;
  console.log(data);
  return (
    <>
      <Container>
        <Row className="mt-3">
          <Col md="2">
            <List items={items} compute={compute} />
          </Col>
          <Col md="10">
            <CardGroup>
              <ProductCard subId={sub} itemsPerPage={2} />
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
