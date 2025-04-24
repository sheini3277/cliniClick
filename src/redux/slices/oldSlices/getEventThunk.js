import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEventThunk = createAsyncThunk(
   'getEvent', 
   async ({eventId }) => {
       
       const res = await fetch(`http://localhost:1234/event/${eventId}`);
      

       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get event"  );

           return data.events;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
