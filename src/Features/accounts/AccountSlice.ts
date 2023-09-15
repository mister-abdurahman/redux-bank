import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { createSlice } from "@reduxjs/toolkit";

interface actionType {
  type: string;
  payload?: any;
}
export interface initialStateAccountType {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}
const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

// With Redux Toolkit:
const AccountSlice = createSlice({
  name: "account",
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return;
      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance = state.balance + action.payload.amount;
    },
    payLoan(state) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance -= state.loan;
    },
  },
});

console.log(AccountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = AccountSlice.actions;

export default AccountSlice.reducer;

// OLD:
// export default function accountReducer(
//   state: initialStateAccountType = initialStateAccount,
//   action: actionType
// ) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// // accountReducer action creators:
// export function deposit(amount: number, currency: string) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   // using thunk
//   return async function (dispatch: (x: actionType) => void, getState: any) {
//     dispatch({ type: "account/convertingCurrency" });
//     // API call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const convertedTOUSD = data.rates.USD;

//     // return action
//     dispatch({ type: "account/deposit", payload: convertedTOUSD });
//   };
// }
// export function withdraw(amount: number) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount: number, purpose: string) {
//   return { type: "account/requestLoan", payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }
