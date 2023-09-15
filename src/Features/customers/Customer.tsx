import { rootReducerType } from "../../store-v2";
import { useSelector } from "react-redux";
import { initialStateCustomerType } from "./Customerslice";

function Customer() {
  const customer = useSelector(
    (store: rootReducerType) => store.customer?.fullName
  );
  console.log(customer);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
