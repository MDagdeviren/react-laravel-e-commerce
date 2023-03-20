import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../features/productSlice";
import AddProductModal from "./AddProductModal";
import CardAdmin from "./CardAdmin";

const ProductManagement = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
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
