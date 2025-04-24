import { createSlice } from "@reduxjs/toolkit";
import { addEventThunk } from "./addEventSlice";
import { getEventThunk } from "./getEventThunk";
import { searchEventThunk } from "./searchEventThunk";
import { deleteEventThunk } from "./deleteEvent";
import { editEventThunk } from "./editEventThunk";

const INITIAL_STATE = {
    events: [{
        name: "",
        date: "",
        time: new Date().getTime(),
        description: "",
        id: ""
    }],
    searchEvents: [

    ]
}

export const eventsSlice = createSlice({
    name: 'event',
    initialState: INITIAL_STATE,
    reducers: {

        editEvents: (state, action) => {
            state.events = action.payload;
        },

    },
    extraReducers: (builder) => {

        builder.addCase(addEventThunk.pending, (state) => {
        });
        builder.addCase(addEventThunk.fulfilled, (state, action) => {
            debugger
            // state.events.push(action.meta.arg.event);
            state.events = action.payload;
            console.log("event:success ", action.meta.arg.event);
        });

        builder.addCase(addEventThunk.rejected, (state, action) => {

            console.log("action:failed ", action);
        });

        builder.addCase(getEventThunk.pending, (state, action) => {
        });
        builder.addCase(getEventThunk.fulfilled, (state, action) => {
            state.events = action.payload;
            console.log("action:success ", action.payload);
        });
        builder.addCase(getEventThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });

        builder.addCase(searchEventThunk.fulfilled, (state, action) => {
            state.searchEvents = action.payload.events;
        });
        builder.addCase(searchEventThunk.rejected, (state, action) => {
            console.log("couldent search event");
        });

        builder.addCase(deleteEventThunk.fulfilled, (state, action) => {
            debugger
            let arr = state.events.filter(e => e.id !== action.meta.arg.eventId)
            state.events = arr;
            console.log(state.events + "ghghghghghghghghghghghghghghghghghgh");
        });
        builder.addCase(deleteEventThunk.rejected, (state, action) => {
            console.log(action + "delete in rejected");
        });

        builder.addCase(editEventThunk.fulfilled, (state, action) => {
            debugger
            console.log(action.meta.arg.eventId + "ggggggggggggggggggggggggggggg");
            state.events = action.payload
        });
        builder.addCase(editEventThunk.rejected, (state, action) => {
            console.log("couldent search event");
        });
    }
});

export const { editEvents } = eventsSlice.actions;

