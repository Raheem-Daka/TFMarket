import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import AdminProductsSlice from "./admin/productSlice/index.js";

const store = configureStore({
    reducer: {
        auth: authReducer,
        AdminProducts: AdminProductsSlice
    }
})

export default store;