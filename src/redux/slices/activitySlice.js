import { createSlice } from "@reduxjs/toolkit";
import { addActivityFetch } from "./addActivityFetch";
import { getActivityThunk } from "./getActivityThunk";

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
    name: 'activity',
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
        builder.addCase(getActivityThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getActivityThunk.fulfilled, (state, action) => {   
            state.activitiesList = (action.payload);
            state.loading = false;
        });
        builder.addCase(getActivityThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        
    }
})
export const { newCurrentActivty } = activitySlice.actions