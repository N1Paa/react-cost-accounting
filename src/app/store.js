import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from '../features/authentication';
import addUserReducer from '../features/authentication';
import clearCurrentReducer from '../features/authentication';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    auth: authenticationReducer,
    addUser: addUserReducer,
    clearCurrent: clearCurrentReducer
})

const persistConfig = {
    key: 'root',
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, rootReducer)  

    const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
    });

    export const persistor = persistStore(store);

    export default store;

