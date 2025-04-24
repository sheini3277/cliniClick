import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTreatmentThunk1 = createAsyncThunk(
    'fetchTreatmentThunk1',
    async () => {
        const response = await fetch("https://localhost:1990/api/treatment");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)