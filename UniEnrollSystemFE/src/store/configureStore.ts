import { configureStore, combineReducers } from "@reduxjs/toolkit";
import registrationSlice from "./actions/registrationSlice";
import modalSlice from "./actions/modalSlice";
import scheduleSlice from "./actions/scheduleSlice";

const reducer = combineReducers({
    registration: registrationSlice,
    modal: modalSlice,
    schedule: scheduleSlice,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
