import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import accountReducer, {
  initialStateAccountType,
} from "./Features/accounts/AccountSlice";
import customerReducer, {
  initialStateCustomerType,
} from "./Features/customers/Customerslice";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from "@reduxjs/toolkit";

export interface rootReducerType {
  account?: initialStateAccountType;
  customer?: initialStateCustomerType;
}

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
