import { createSlice } from "@reduxjs/toolkit";
import { fetchTreatmentThunk } from "./getTreatmentFetch";
import { addTreatmentFetch } from "./addTreatmentFetch";
import { updateTreatmentThunk } from "./updateTreatmentFetch";
import { getOneTreatmentThunk } from "./getOneTreatmentFetch";

const INITIAL_STATE = {
    treatmentList: [],
    loading: false,
    thisDay: Date.now(),
    curretntTreatment: {
        treatmentId: null,
        treatmentDate: "2025-03-26",
        treatmentTime: null,
        pationtId: "",
        isComing: true,
        escort: "",
        cooperation: null,
        nextMeetingPlanning: "",
        bePaid: true,
        userId: ""
    }

}
export const treatmentSlice2 = createSlice({
    name: 'treatment',
    initialState: INITIAL_STATE,
    reducers: {
        newCurrentTreatment: (state, action) => {
            state.curretntTreatment = action.payload
        },
        changeDateForTreatment: (state, action) => {
            state.thisDay = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchTreatmentThunk.pending, (state) => {
            debugger
            state.loading = true;
        });
        builder.addCase(fetchTreatmentThunk.fulfilled, (state, action) => {
            debugger
            console.log("action: ", action.payload);
            state.treatmentList = action.payload;

            state.loading = false;

        });
        builder.addCase(fetchTreatmentThunk.rejected, (state, action) => {
            debugger
            console.log("action: ", action);
            state.loading = false;
        });

        builder.addCase(addTreatmentFetch.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTreatmentFetch.fulfilled, (state, action) => {
            debugger   
            state.treatmentList.push(action.payload);
            state.loading = false;
        });
        builder.addCase(addTreatmentFetch.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        builder.addCase(updateTreatmentThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateTreatmentThunk.fulfilled, (state, action) => {
            state.treatmentList.push(action.payload);
            state.loading = false;
        });
        builder.addCase(updateTreatmentThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        builder.addCase(getOneTreatmentThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOneTreatmentThunk.fulfilled, (state, action) => {
            debugger
            state.curretntTreatment = action.payload;
            state.loading = false;
        });
        builder.addCase(getOneTreatmentThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
    }
})
export const { newCurrentTreatment, changeDateForTreatment } = treatmentSlice2.actions 