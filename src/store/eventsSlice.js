import { createSlice } from '@reduxjs/toolkit';
import {addToIdsByDate, removeFromIdsByDate} from '../utils/idsByDateHelper'

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        eventsById: {},
        eventIdsByDate: {},
    }, 
    reducers: {
        addEvents(state, action) {
            const { events = [] } = action.payload;
            for (const event in events) {
                const { eventId } = event;
                if ( eventId ) {
                    state.eventsById[eventId] = event;
                    addToIdsByDate(state.eventIdsByDate, eventId, event.startDate, event.deadlineDate);
                }
            }
        },
        removeEvent(state, action) {
            const { eventId } = action.payload;
            if ( !eventId ) { return; }
            const oldEvent = state.eventsById[eventId];
            if ( !oldEvent ) { return; }

            removeFromIdsByDate(state.eventIdsByDate, eventId, oldEvent.startDate, oldEvent.deadlineDate);
            state.eventsById[eventId] = null;
        },
        updatedEvent(state, action) {
            const { updatedEvent } = action.payload;
            if (!updatedEvent) { return; }
            const { eventId } = updatedEvent;
            if (!eventId) { return; }
            const { oldEvent } = state.eventsById[eventId];
            if ( !oldEvent ) { return; }
            const { updatedStartDate } = updatedEvent.startDate;
            if ( !updatedStartDate ) { return; }

            if (oldEvent.startDate !== updatedStartDate || oldEvent.deadlineDate !== updatedEvent.deadlineDate) {
                removeFromIdsByDate(state.eventIdsByDate, eventId, oldEvent.startDate, oldEvent.deadlineDate);
                addToIdsByDate(state.eventIdsByDate, eventId, updatedStartDate, updatedEvent.deadlineDate)
            }
        }
    },
});

export const { addEvents, removeEvent, updatedEvent } = eventsSlice.actions;
export default eventsSlice;