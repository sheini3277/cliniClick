import { createAsyncThunk } from "@reduxjs/toolkit";


export const addActivityFetch = createAsyncThunk(
    'addActivityFetch',
    async (activity) => {
        const response = await fetch("https://localhost:1990/api/activity/AddActivity",
            {
                method: 'POST',
                body: JSON.stringify(activity),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json();
        return data;
    }
)