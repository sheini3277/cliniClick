import { createSlice } from "@reduxjs/toolkit";
import { getPatientByUserIdThunk } from "./getPatientByUserId";
import { addPatientThunk } from "./addPatientFetch";
import { getPatientByIdThunk } from "./getPatientById";

const INITIAL_STATE = {
    patientList: [],
    loading: false,
    currentPatient: {
        pationtId: "",
        firstName: "",
        lastName: "",
        therapistId: "",
        phone: "",
        age: 0,
        birthDate: new Date(),
        background: "",
        educationalFramework: "",
        diagnosis: "",
        circulationMedium: "",
        startTreatmentDate: new Date()
    }

}
const serializeDate = (state) => {
    if (state.currentPatient && state.currentPatient.birthDate instanceof Date) {
      state.currentPatient = {
        ...state.currentPatient,
        birthDate: state.currentPatient.birthDate.toISOString()
      };
    }
    return state;
  };

export const patientSlice = createSlice({
    name: 'patient',
    initialState: INITIAL_STATE,
    reducers: {
        newCurrentpatient: (state, action) => {
            state.currentPatient = action.payload
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getPatientByUserIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPatientByUserIdThunk.fulfilled, (state, action) => {
            state.patientList = action.payload;
            state.loading = false;
            return serializeDate(state);
        });
        builder.addCase(getPatientByUserIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.loading = false;
        });
        //addPatientThunk
        builder.addCase(addPatientThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(addPatientThunk.fulfilled, (state, action) => {
            state.patientList.push(action.payload);
        });
        builder.addCase(addPatientThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });
        builder.addCase(getPatientByIdThunk.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getPatientByIdThunk.fulfilled, (state, action) => {
            state.currentPatient = action.payload;
            return serializeDate(state);
        });
        builder.addCase(getPatientByIdThunk.rejected, (state, action) => {
            console.log("action: ", action);
            state.route = "Failed to get data";
            state.loading = false;
        });

    }
})
export const { newCurrentpatient } = patientSlice.actions 