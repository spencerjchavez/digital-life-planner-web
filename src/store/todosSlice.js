import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
           
    }, 
    reducers: {

    },
});

export const todosActions = todosSlice.actions;
export default todosSlice;