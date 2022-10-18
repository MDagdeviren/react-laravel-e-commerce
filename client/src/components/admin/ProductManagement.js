import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/productSlice";
import AddProductModal from "./AddProductModal";
import CardAdmin from "./CardAdmin";
const ProductManagement = (args) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    console.log("test");
  }, []);
  return (
    <div className="m-4">
      <AddProductModal />
      <>
        <CardAdmin />
      </>
    </div>
  );
};

export default ProductManagement;
