import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientByUserIdThunk = createAsyncThunk(
   'getPatientByUserId', 
   async (userId ) => {
       
       const res = await fetch(`https://localhost:1990/api/pationt/getByUserId/${userId}`);
      

       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get event"  );

           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
