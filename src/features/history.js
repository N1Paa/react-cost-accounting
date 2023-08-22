import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const historyAdapter = createEntityAdapter();

const historySlice = createSlice({
    name: 'history',
    initialState: historyAdapter.getInitialState(),
    reducers: {
        addHistory: historyAdapter.upsertOne
    }
})

export const historyReducer = historySlice.reducer;

export const { addHistory } = historySlice.actions;

export const historySelectors = historyAdapter.getSelectors((state) => state.history)