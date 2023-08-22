import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {authenticationReducer} from '../features/authentication';
import { usersReducer } from '../features/users';
import { historyReducer }  from '../features/history';
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

const persistConfig = {
    key: 'root',
    storage,
  }


  const rootReducer = combineReducers({
    users: usersReducer,
    auth: authenticationReducer,
    history: historyReducer
  })

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