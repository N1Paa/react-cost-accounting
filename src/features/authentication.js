import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { AUTORIZATION_TIMEOUT } from '../app/constants';



const usersAdapter = createEntityAdapter()

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState: usersAdapter.getInitialState(
        {
        currentUser: 123,
        expiredAt: 0,
    }   
    ), 
    reducers: {
        authentication: (state, id) => {
            state.currentUser = id.payload;
            state.expiredAt = Date.now() + AUTORIZATION_TIMEOUT;
        },
        addUser: usersAdapter.addOne,
        clearCurrent: (state) => {
            state.currentUser = null
        },
    }
})

export const {authentication, addUser, clearCurrent, addExpenses} = authenticationSlice.actions;

export const usersSelectors = usersAdapter.getSelectors()

export default authenticationSlice.reducer;