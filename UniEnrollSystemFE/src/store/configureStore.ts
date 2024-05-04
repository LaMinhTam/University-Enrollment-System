import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registrationSlice from "./actions/registrationSlice";
import modalSlice from "./actions/modalSlice";

const reducer = combineReducers({
    registration: registrationSlice,
    modal: modalSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
