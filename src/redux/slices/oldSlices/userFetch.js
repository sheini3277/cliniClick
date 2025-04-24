import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserThunk = createAsyncThunk(
    'fetchUserThunk',
    async () => {
        const response = await fetch("http://localhost:1234/login");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)