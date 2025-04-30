import { createSlice } from "@reduxjs/toolkit";
import { getAimThunk } from "./getAimsThunk";
import { getAimsOfPatientsThunk } from "./getAimsForPatients";

const INITIAL_STATE = {
    aimsList: [],
    loading: false,
    currentAim: {
        aimId: null,
        aimName: "",
        aimDiscription: "",
        paitionId: null
    }

}

export const aimSlice = createSlice({
    name: 'aim',
    initialState: INITIAL_STATE,
    reducers: {
    },
    extraReducers: (builder) => {

        builder.addCase(getAimThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAimThunk.fulfilled, (state, action) => {
            state.aimsList = (action.payload);
            state.loading = false;
        });
        builder.addCase(getAimThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.loading = false;
        });

        builder.addCase(getAimsOfPatientsThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAimsOfPatientsThunk.fulfilled, (state, action) => {
            debugger
            state.aimsList = action.payload;
            state.loading = false;
        });
        builder.addCase(getAimsOfPatientsThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.loading = false;
        });
    }
})
export const { currentAim } = aimSlice.actions 