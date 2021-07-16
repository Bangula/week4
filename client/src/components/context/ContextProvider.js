import React, { useReducer } from "react";

const UserContext = React.createContext();

const initialState = {};
const reducer = (state, action) => {
  let data = { ...state, ...action };
  return data;
};

const ContextProvider = ({ children }) => {
  const [userInfo, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export { ContextProvider, UserContext };
