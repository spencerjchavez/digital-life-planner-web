import { createSlice } from '@reduxjs/toolkit';

const desiresSlice = createSlice({
    name: 'desires',
    initialState: {
        desiresById: {}, 
    }, 
    reducers: {
        addDesires(state, action) {
            const { desires = [] } = action.payload;
            for (const desire of desires) {
                state.desiresById[desire.desireId ?? -1] = desire;
            }
        },
        removeDesire(state, action) {
            const { desireId = -1 } = action.payload;
            state.desiresById[desireId] = null;
        },
        updateDesire(state, action) {
            const { updatedDesire } = action.payload;
            if (!updatedDesire) { return; }
            const { desireId } = updatedDesire;
            if (!desireId) { return; }

            state.desiresById[desireId] = updatedDesire;
        },
    },
});

export const { addDesires, updateDesire, removeDesire } = desiresSlice.actions;
export default desiresSlice;