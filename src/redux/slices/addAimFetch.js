import { createAsyncThunk } from "@reduxjs/toolkit";


export const addAimFetch = createAsyncThunk(
    'addAimFetch',
    async (aim) => {
        const response = await fetch("https://localhost:1990/api/aim/AddAim",
            {
                method: 'POST',
                body: JSON.stringify(aim),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        debugger
        const data = await response.json();
        return data;
    }
)