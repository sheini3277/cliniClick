import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserThunk = createAsyncThunk(
    'fetchUserThunk',
    async () => {
        const response = await fetch("https://localhost:1990/api/user");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)