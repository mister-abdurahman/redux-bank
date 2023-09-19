import { useState } from "react";
import {
  deposit,
  initialStateAccountType,
  payLoan,
  requestLoan,
  withdraw,
} from "./AccountSlice";
import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "../../store-v2";
import { AnyAction } from "redux";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const account = useSelector((store: rootReducerType) => store.account);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch<any>(deposit(depositAmount, currency));
    // dispatch<any>(deposit(depositAmount));
    setDepositAmount(0);
    setCurrency("USD");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount(0);
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    // dispatch(requestLoan(loanAmount));
    setLoanAmount(0);
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
    setWithdrawalAmount(0);
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit} disabled={account?.isLoading}>
            {account?.isLoading ? (
              "Converting..."
            ) : (
              <span> Deposit {depositAmount} </span>
            )}
          </button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {account?.loan ? (
          <div>
            <span>Pay back ${account?.loan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AccountOperations;
