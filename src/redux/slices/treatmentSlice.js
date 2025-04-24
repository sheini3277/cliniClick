import { createSlice } from "@reduxjs/toolkit";
import { fetchTreatmentThunk } from "./getTreatmentFetch";
import { addTreatmentFetch } from "./addTreatmentFetch";

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

export const treatmentSlice = createSlice({
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
            state.loading = true;
        });
        builder.addCase(fetchTreatmentThunk.fulfilled, (state, action) => {
            state.treatmentList = action.payload;

            state.loading = false;

        });
        builder.addCase(fetchTreatmentThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.loading = false;
        });

        builder.addCase(addTreatmentFetch.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addTreatmentFetch.fulfilled, (state, action) => {
            debugger
            state.treatmentList.push(action.payload);
        });
        builder.addCase(addTreatmentFetch.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
    }
})
export const { newCurrentTreatment, changeDateForTreatment } = treatmentSlice.actions 