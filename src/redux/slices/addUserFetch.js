import { createAsyncThunk } from "@reduxjs/toolkit";


export const addUserThunk = createAsyncThunk(
    'addUserThunk',
    async (user) => {
        const response = await fetch("https://localhost:1990/api/user/Add",
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