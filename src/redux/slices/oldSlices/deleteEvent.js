import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteEventThunk = createAsyncThunk(
    'deleteEventThunk',
    async ({ id, eventId }) => {

        const res = await fetch(`http://localhost:1234/event/${id}/${eventId}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            console.log("eventId" + eventId);
            return eventId;
        } else {
            throw new Error('failed to fetch');
        }
    }
);