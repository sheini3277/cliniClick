import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateTreatmentThunk = createAsyncThunk(
    'updateTreatmentThunk',
    async ({ treatmentId, treatment }) => {

        const res = await fetch(`https://localhost:1990/api/treatment/UpdateTreatment/${treatmentId}`, {
            method: 'PUT',
            body: JSON.stringify(treatment),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error('failed to fetch');
        }
    }
);  