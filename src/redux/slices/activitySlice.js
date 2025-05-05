import { createSlice } from "@reduxjs/toolkit";
import { addActivityFetch } from "./addActivityFetch";

const INITIAL_STATE = {
    activitiesList: [],
    loading: false,
    thisDay: Date.now(),
    curretntActivity: {
        activityId: null,
        activityName: null,
        activityDescription: null,
        activityAim: null
    }

}
export const activitySlice = createSlice({
    name: 'treatment',
    initialState: INITIAL_STATE,
    reducers: {
        newCurrentActivty: (state, action) => {
            state.curretntActivity = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(addActivityFetch.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addActivityFetch.fulfilled, (state, action) => {   
            state.activitiesList.push(action.payload);
            state.loading = false;
        });
        builder.addCase(addActivityFetch.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        
    }
})
export const { newCurrentActivty } = activitySlice.actions