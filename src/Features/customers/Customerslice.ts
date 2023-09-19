import { createSlice } from "@reduxjs/toolkit";

export interface initialStateCustomerType {
  fullName: string;
  nationalID: string;
  createdAt: string;
}
interface actionType {
  type: string;
  payload?: any;
}

const initialStateCustomer: {
  fullName: string;
  nationalID: string;
  createdAt: null | Date;
} = {
  fullName: "",
  nationalID: "",
  createdAt: null,
};

const CustomerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalID: string) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action: actionType) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = new Date();
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = CustomerSlice.actions;

export default CustomerSlice.reducer;

// Old:
// export default function customerReducer(
//   state: initialStateCustomerType = initialStateCustomer,
//   action: actionType
// ) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case "customer/updateName":
//       return { ...state, fullName: action.payload };
//     default:
//       return state;
//   }
// }

// // customerReducer action creators:
// export function createCustomer(fullName: string, nationalID: string) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }
// export function updateName(fullName: string) {
//   return { type: "customer/updateName", payload: { fullName } };
// }
