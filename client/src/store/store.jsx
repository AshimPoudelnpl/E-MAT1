import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import voteReducer from "./vote-slice";

const store = configureStore({
    reducer: { ui: uiReducer, vote: voteReducer }
});
export default store;