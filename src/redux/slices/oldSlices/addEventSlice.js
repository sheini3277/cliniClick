import { createAsyncThunk } from "@reduxjs/toolkit";


export const addEventThunk = createAsyncThunk(
    'addEvent', 
    async ({ event, eventId }) => {
        console.log('tokenFetch ' + eventId); 
        const res = await fetch(`http://localhost:1234/event/${eventId}`, {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fetch success");
            return data.events;
        } else {
            throw new Error('failed to fetch');
        }
    }
);

