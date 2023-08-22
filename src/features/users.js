import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const usersAdapter = createEntityAdapter();

const usersSlice = createSlice({
    name: 'users',
    initialState: usersAdapter.getInitialState(),
    reducers: {
        addUser: usersAdapter.addOne
    }
})

export const { addUser } = usersSlice.actions;

export const usersSelectors = usersAdapter.getSelectors((state) => state.users);

export const usersReducer = usersSlice.reducer;