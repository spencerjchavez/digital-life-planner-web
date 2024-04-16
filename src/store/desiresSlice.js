import { createSlice } from '@reduxjs/toolkit';

const desiresSlice = createSlice({
    name: 'desires',
    initialState: {
        loading: false,
        desiresById: {}, 
    }, 
    reducers: {
        addDesires(state, action) {
            const { desires } = action.payload;
            for (const desire of desires) {
                state.desiresById[desire.desireId] = desire;
            }
        },
        removeDesire(state, action) {
            state.desiresById[action.payload.desireId ?? -1] = null;
        },
        updateDesire(state, action) {
            const { desire } = action.payload;
            if (desire) {
                state.desiresById[desire.desireId] = desire;
            }
        },
        getDesire(state, action) {

        }
    },
});

export const desiresActions = desiresSlice.actions;
export default desiresSlice;