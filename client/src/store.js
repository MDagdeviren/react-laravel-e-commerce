import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import messageReducer from "./features/messageSlice";
import categoryReducer from "./features/categorySlice";
import subCategoryReducer from "./features/subCategorySlice";
import productReducer from "./features/productSlice";
import storeAppealReducer from "./features/storeAppealSlice";
import storeReducer from "./features/storeSlice";
import storeApprovalReducer from "./features/storeApprovalSlice";
import storeProductReducer from "./features/storeProductSlice";
import storeInfoReducer from "./features/storeInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    category: categoryReducer,
    subCategory: subCategoryReducer,
    product: productReducer,
    storeAppeal: storeAppealReducer,
    storeApproval: storeApprovalReducer,
    store: storeReducer,
    storeProduct: storeProductReducer,
    storeInfo: storeInfoReducer,
  },
});

export default store;
