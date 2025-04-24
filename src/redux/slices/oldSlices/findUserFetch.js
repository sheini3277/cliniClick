import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFindUserThunk = createAsyncThunk(
    'fetchFindUserThunk',
    async (user) => {
        const response = await fetch("http://localhost:1234/login",
        {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response.status);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('faild to fetch');
        };
    }
)