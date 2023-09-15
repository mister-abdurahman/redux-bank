import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import accountReducer, {
  initialStateAccountType,
} from "./Features/accounts/AccountSlice";
import customerReducer, {
  initialStateCustomerType,
} from "./Features/customers/Customerslice";
import { composeWithDevTools } from "redux-devtools-extension";

export interface rootReducerType {
  account?: initialStateAccountType;
  customer?: initialStateCustomerType;
}

const rootReducer = combineReducers<rootReducerType>({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
