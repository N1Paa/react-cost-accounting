import { createSlice } from '@reduxjs/toolkit';
import { AUTORIZATION_TIMEOUT } from '../app/constants';

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState:
        {
        currentUser: null,
        expiredAt: 0,
    }, 
    reducers: {
        authentication: (state, id) => {
            state.currentUser = id.payload;
            state.expiredAt = Date.now() + AUTORIZATION_TIMEOUT;
        },
        clearCurrent: (state) => {
            state.currentUser = null
        },
    }
})


export const {authentication, clearCurrent } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;