import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTreatmentThunk = createAsyncThunk(
    'fetchTreatmentThunk',
    async (userId) => {
        const response = await fetch(`https://localhost:1990/api/treatment/getByUserId/${userId}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)