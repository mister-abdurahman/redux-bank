import { connect, useSelector } from "react-redux";
import { rootReducerType } from "../../store-v2";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// Legacy method of connecting redux to react with react-redux before hooks:
function BalanceDisplay({ balance }: { balance: number | undefined }) {
  return <div className="balance">{formatCurrency(balance || 0)}</div>;
}

// convention name:
function mapStateToProps(state: rootReducerType) {
  return {
    balance: state.account?.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay); //connect method connects our return value as the props in "BalanceDisplay"

// Modern way:
// function BalanceDisplay() {
//   const deposit = useSelector(
//     (store: rootReducerType) => store.account?.balance
//   );

//   return <div className="balance">{formatCurrency(deposit || 0)}</div>;
// }

// export default BalanceDisplay;
