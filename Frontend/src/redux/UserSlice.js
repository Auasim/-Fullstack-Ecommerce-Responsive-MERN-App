import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email : "",
    firstName : "",
    lastName : "",
    image : "",
    _id : ""
}

 const UserSlice = createSlice ({
    name : "user",
    initialState,
    reducers : {
        loginRedux : (state, action) => {
            console.log(action.payload.data)
            // state.user = action.payload.data;
            state.email = action.payload.data.email;
            state.firstName = action.payload.data.firstName;
            state.lastName = action.payload.data.lastName;
            state.image = action.payload.data.image;
            state._id = action.payload.data._id;
        },
        logoutRedux : (state, action) => {
            state.email = "";
            state.firstName = "";
            state.lastName = "";
            state.image = "";
            state._id = "";
        },
    },
})

export const { loginRedux, logoutRedux } = UserSlice.actions;
export default UserSlice.reducer;