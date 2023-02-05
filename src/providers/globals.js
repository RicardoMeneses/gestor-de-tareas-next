import { createContext, useReducer } from "react";

let initialState = {
  addTask: false,
};
function reducer(state, action) {
  return { ...state, ...action };
}

const GlobalsContext = createContext();

const GlobalsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <GlobalsContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalsContext.Provider>
  );
};

export { GlobalsContext, GlobalsProvider };
