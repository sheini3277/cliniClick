import { createAsyncThunk } from "@reduxjs/toolkit";


export const addTreatmentFetch = createAsyncThunk(
    'addTreatmentFetch',
    async (treatment) => {
        debugger   
        const response = await fetch("https://localhost:1990/api/treatment/AddTreatment",
            {
                method: 'POST',
                body: JSON.stringify(treatment),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json();
        return data;
    }
)