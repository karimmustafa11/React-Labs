import React, { useReducer } from "react";

// Reducer function
const reducerFunction = (state, action) => {
  switch (action.type) {
    case "incrementCount1By1":
      return { ...state, count1: state.count1 + 1 };
    case "incrementCount1By3":
      return { ...state, count1: state.count1 + 3 };
    case "incrementCount2":
      return { ...state, count2: state.count2 + action.payload };
    default:
      return state;
  }
};

// Component
export default function Counters() {
  const [state, dispatch] = useReducer(reducerFunction, {
    count1: 0,
    count2: 0,
  });

  return (
    <div>
      <h2>Counter 1: {state.count1}</h2>
      <button onClick={() => dispatch({ type: "incrementCount1By1" })}>
        +1 to Count1
      </button>
      <button onClick={() => dispatch({ type: "incrementCount1By3" })}>
        +3 to Count1
      </button>

      <h2>Counter 2: {state.count2}</h2>
      <button onClick={() => dispatch({ type: "incrementCount2", payload: 5 })}>
        +5 to Count2
      </button>
    </div>
  );
}
