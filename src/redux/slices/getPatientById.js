import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPatientByIdThunk = createAsyncThunk(
   'getPatientByIdThunk', 
   async (patientId ) => {
       
       const res = await fetch(`https://localhost:1990/api/pationt/getByPatientId/${patientId}`);
       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get event");

           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);