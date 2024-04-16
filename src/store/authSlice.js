import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        userId: null,
        apiKey: null,    
    }, 
    reducers: {
        login(state, action) {
            const { usedId, apiKey } = action.payload;
            state.usedId = usedId;
            state.apiKey = apiKey;
            state.loading = false;
        },
        logout(state) {
            state.loading = false;
            state.userId = null;
            state.apiKey = null;
        },
        error(state, action) {
            state.error = action.payload.error;
            state.loading = false;
        },
        setLoadingTrue(state, action) {
            state.loading = true;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;