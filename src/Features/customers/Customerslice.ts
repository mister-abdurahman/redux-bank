export interface initialStateCustomerType {
  fullName: string;
  nationalID: string;
  createdAt: string;
}
interface actionType {
  type: string;
  payload?: any;
}

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

export default function customerReducer(
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

// customerReducer action creators:
export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}
export function updateName(fullName: string) {
  return { type: "customer/updateName", payload: { fullName } };
}
