import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./UserSlice";
import productSlideReducer from "./productSlide";


export const store = configureStore({
    reducer: {
        user : UserSliceReducer,
        product : productSlideReducer
    },
});