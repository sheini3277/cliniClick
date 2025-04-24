import { createAsyncThunk } from "@reduxjs/toolkit";


export const addUserThunk = createAsyncThunk(
    'addUserThunk',
    async (user) => {
        const response = await fetch("http://localhost:1234/register",
            {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json();
        return data;
    }
)