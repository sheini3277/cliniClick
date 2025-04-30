import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAimsOfPatientsThunk = createAsyncThunk(
   'getAimsOfPatientsThunk', 
   async (patientId ) => {
       
       const res = await fetch(`https://localhost:1990/api/aim/getByPatientId/${patientId}`);
       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get event"  );

           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);