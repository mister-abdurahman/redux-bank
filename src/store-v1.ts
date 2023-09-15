import { combineReducers, createStore } from "redux";
interface actionType {
  type: string;
  payload: any;
}
interface initialStateAccountType {
  balance: number;
  loan: number;
  loanPurpose: string;
}
interface initialStateCustomerType {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(
  state: initialStateAccountType = initialStateAccount,
  action: actionType
) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function customerReducer(
  state: initialStateCustomerType = initialStateCustomer,
  action: actionType
) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// accountReducer action creators:
function deposit(amount: number) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount: number) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount: number, purpose: string) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
store.dispatch(deposit(5000));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(1000, "Business"));

console.log(store.getState());

// customerReducer action creators:
function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
function updateName(fullName: string) {
  return { type: "customer/updateName", payload: { fullName } };
}

store.dispatch(createCustomer("Abdurahman Aramide", "4343432123421"));
console.log(store.getState());
