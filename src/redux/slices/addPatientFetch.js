import { createAsyncThunk } from "@reduxjs/toolkit";


export const addPatientThunk = createAsyncThunk(
    'addPatientThunk',
    async (patient) => {
        const response = await fetch("https://localhost:1990/api/pationt/AddPationt",
            {
                method: 'POST',
                body: JSON.stringify(patient),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        debugger
        const data = await response.json();
        return data;
    }
)