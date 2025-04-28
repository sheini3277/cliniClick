import { configureStore } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";
import { usersSlice } from "./slices/usersSlice";
import { patientSlice } from "./slices/patientSlice";
import { treatmentSlice } from "./slices/treatmentSlice";
import { aimSlice } from "./slices/aimsSlice";


const reducers = combineSlices(usersSlice,patientSlice,treatmentSlice,aimSlice);

export const STORE = configureStore({
    reducer: reducers,
})


