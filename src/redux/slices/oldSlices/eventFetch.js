import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEventThunk = createAsyncThunk(
    'fetchEventThunk',
    async () => {
        const response = await fetch("http://localhost:1234/event/:name");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        }
    }
)