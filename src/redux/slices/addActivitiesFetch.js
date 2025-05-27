import { createAsyncThunk } from "@reduxjs/toolkit";


export const addActivitiesFetch = createAsyncThunk(
    'addActivitiesFetch',
    async (activities) => {
        const response = await fetch("https://localhost:1990/api/activity/AddActivities",
            {
                method: 'POST',
                body: JSON.stringify(activities),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        const data = await response.json();
        return data;
    }
)