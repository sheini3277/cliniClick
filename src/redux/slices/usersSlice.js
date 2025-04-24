import { createSlice } from "@reduxjs/toolkit";
import { fetchUserThunk } from "./userFetch";
import { addUserThunk } from "./addUserFetch";
import { findUserByIdThunk } from "./findUserByIdThunk";

const INITIAL_STATE = {
    usersList: [],
    loading: false,
    currentUser: {
        userId: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        treatmentType: "",
        password: ""
    },
}

export const usersSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        findUser: (state, action) => {
            state.usersList.find(action.payload)
        },
        resetUser: (state, action) => {
            state.currentUser = {
                userId: "",
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                treatmentType: "",
                password: ""
            }
        }
    },
    extraReducers: (builder) => {

        //fetchUserThunk
        builder.addCase(fetchUserThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
            state.usersList = action.payload;
            // state.currentUser = action.payload;
            state.loading = false;
            state.token = action.payload;

        });
        builder.addCase(fetchUserThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        //addUserThunk
        builder.addCase(addUserThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addUserThunk.fulfilled, (state, action) => {
            state.usersList.push(action.payload);
        });
        builder.addCase(addUserThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        //findUserByIdFetch
        builder.addCase(findUserByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(findUserByIdThunk.fulfilled, (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;

        });
        builder.addCase(findUserByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
    }
})
export const { findUser, resetUser } = usersSlice.actions;

