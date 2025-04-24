import { createAsyncThunk } from "@reduxjs/toolkit";

export const editEventThunk = createAsyncThunk(
    'editEventThunk',
    async ({ id, eventId ,event}) => {

        const res = await fetch(`http://localhost:1234/event/${id}/${eventId}`, {
            method: 'PUT',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(event.name + "!!!!!!!!!!!!!!!!!!!!!!");
        if (res.ok) {
            const data = await res.json();
            
            return data.events;
        } else {
            throw new Error('failed to fetch');
        }
    }
);  