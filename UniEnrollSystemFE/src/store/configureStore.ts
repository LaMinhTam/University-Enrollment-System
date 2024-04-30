import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registrationSlice from "./actions/registrationSlice";

const reducer = combineReducers({
    registration: registrationSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
