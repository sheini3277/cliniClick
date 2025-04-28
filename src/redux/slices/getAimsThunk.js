import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAimThunk = createAsyncThunk(
    'getAimThunk',
    async () => {
        const response = await fetch("https://localhost:1990/api/aim");
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)