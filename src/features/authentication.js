import { createSlice } from '@reduxjs/toolkit';
import { AUTORIZATION_TIMEOUT } from '../app/constants';

const initialState = {
    currentUser: "",
    expiredAt: 0,
    Users: []
}    

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState, 
    reducers: {
        authentication: (state, login) => {
            state.currentUser = login.payload;
            state.expiredAt = Date.now() + AUTORIZATION_TIMEOUT;
        },
        addUser: (state, user) => {
            state.Users.push(user);
        },
        clearCurrent: (state) => {
            state.currentUser = ""
        }
    }
})

export const {authentication, addUser, clearCurrent} = authenticationSlice.actions;

export default authenticationSlice.reducer;