import { createSlice } from "@reduxjs/toolkit";
import { addUserThunk } from "./addUserSlice";
import { fetchUserThunk } from "./userFetch";
import { fetchFindUserThunk } from "./findUserFetch";

const INITIAL_STATE = {
    usersList: [],
    loading: false,
    route: null,
    currentUser: {
        username: "",
        password:"",
    },    
}

export const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        addUser: (state, action) => {
            state.usersList.push(action.payload)
        },
        findUser: (state, action) => {
            state.usersList.find(action.payload)
        },
        setCurrentUser: (state, action) => {
            state.currentUser.username = action.payload.username;
            state.currentUser.password = action.payload.password;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchUserThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserThunk.fulfilled, (state, action) => {
            state.usersList = action.payload;
            state.loading = false;
            state.token = action.payload;

        });
        builder.addCase(fetchUserThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
            state.token = -2;
        })
        builder.addCase(addUserThunk.fulfilled, (state, action) => {
            state.usersList.push(action.payload) ;
        } )
        builder.addCase(fetchFindUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.route = "";    
        } )
        builder.addCase(fetchFindUserThunk.rejected, (state, action) => {
            debugger;
            state.loading = false;
            state.route = "/calender/logon";
        } )

    }
})
export const { addUser ,findUser, setCurrentUser } = userSlice.actions;

