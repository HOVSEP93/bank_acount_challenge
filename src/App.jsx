import { useReducer } from "react";

/*
INSTRUCTIONS / CONSIDERATIONS:

1. Let's implement a simple bank account! It's similar to the example that I used as an analogy to explain how useReducer works, but it's simplified (we're not using account numbers here)

2. Use a reducer to model the following state transitions: openAccount, deposit, withdraw, requestLoan, payLoan, closeAccount. Use the `initialState` below to get started.

3. All operations (expect for opening account) can only be performed if isActive is true. If it's not, just return the original state object. You can check this right at the beginning of the reducer

4. When the account is opened, isActive is set to true. There is also a minimum deposit amount of 500 to open an account (which means that the balance will start at 500)

5. Customer can only request a loan if there is no loan yet. If that condition is met, the requested amount will be registered in the 'loan' state, and it will be added to the balance. If the condition is not met, just return the current state

6. When the customer pays the loan, the opposite happens: the money is taken from the balance, and the 'loan' will get back to 0. This can lead to negative balances, but that's no problem, because the customer can't close their account now (see next point)

7. Customer can only close an account if there is no loan, AND if the balance is zero. If this condition is not met, just return the state. If the condition is met, the account is deactivated and all money is withdrawn. The account basically gets back to the initial state
*/

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state, action) {
  if (!state.isActive && action.type !== "OPEN_ACCOUNT") return state;

  switch (action.type) {
    case "OPEN_ACCOUNT":
      // TODO implement opening an account logic here
      return { ...state, isActive: true, balance: action.payload };

    // TODO implement opening an DEPOSIT logic here
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.payload };

    // TODO implement opening an WITHDRAW logic here
    case "WITHDRAW":
      return { ...state, balance: state.balance - action.payload };

    // TODO implement opening an REQUEST_LOAN logic here
    case "REQUEST_LOAN":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };

    // TODO implement opening an PAY_LOAN logic here
    case "PAY_LOAN":
      return { ...state, loan: 0, balance: state.balance - state.loan };

    // TODO implement opening an CLOSE_ACCOUNT logic here
    case "CLOSE_ACCOUNT":
      if (state.loan > 0 || state.balance !== 0) return state;
      return initialState;

    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className=" prose my-10  text-xl mx-4 justify-center  gap-5 md:text-3xl  flex flex-col items-center">
      <h1>useReducer Bank Account</h1>
      <p>
        Balance: <span className="text-success">{balance}</span>
      </p>
      <p>
        Loan: <span className="text-warning">{loan}</span>
      </p>
      <div className="w-60 space-y-6 flex flex-col ">
        <button
          className="btn btn-info font-bold"
          onClick={() => dispatch({ type: "OPEN_ACCOUNT", payload: 500 })}
          disabled={isActive}
        >
          <span>Open account</span>
        </button>

        <button
          className="btn btn-success  font-bold"
          onClick={() => dispatch({ type: "DEPOSIT", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>

        <button
          className="btn btn-success font-bold"
          onClick={() => dispatch({ type: "WITHDRAW", payload: 50 })}
          disabled={!isActive || balance < 50}
        >
          Withdraw 50
        </button>

        <button
          className="btn btn-warning font-bold"
          onClick={() => dispatch({ type: "REQUEST_LOAN", payload: 5000 })}
          disabled={!isActive || loan > 0}
        >
          Request a loan of 5000
        </button>

        <button
          className="btn btn-warning font-bold"
          onClick={() => dispatch({ type: "PAY_LOAN" })}
          disabled={!isActive || loan <= 0 || balance < 0}
        >
          Pay loan
        </button>

        <button
          className="btn btn-error font-bold"
          onClick={() => dispatch({ type: "CLOSE_ACCOUNT" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </div>
    </div>
  );
}
