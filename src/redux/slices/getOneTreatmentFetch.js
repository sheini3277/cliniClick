import { createAsyncThunk } from "@reduxjs/toolkit";

export const getOneTreatmentThunk = createAsyncThunk(
   'getOneTreatmentThunk', 
   async (treatmentId ) => {
       
       const res = await fetch(`https://localhost:1990/api/treatment/getByTreatmentId/${treatmentId}`);
       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get event"  );

           return data;
       } else {
           throw new Error('failed to fetch');
       }
   }
);