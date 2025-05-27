import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePatientThunk = createAsyncThunk(
    'deletePatientThunk',
    async (patientId) => {

        const res = await fetch(`https://localhost:1990/api/pationt/Delete/${patientId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        debugger
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error('failed to fetch');
        }
    }
);