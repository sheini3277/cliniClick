import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteAimThunk = createAsyncThunk(
    'deleteAimThunk',
    async (aimId) => {

        const res = await fetch(`https://localhost:1990/api/aim/Delete/${aimId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        debugger
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            throw new Error('failed to fetch');
        }
    }
);