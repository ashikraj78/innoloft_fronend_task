import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import counterReducer from "./counterReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

let persistor = persistStore(store);

export { store, persistor };
