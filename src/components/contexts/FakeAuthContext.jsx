import { createContext, useContext, useReducer } from "react";
// This context is for the user Authentication.
const AuthContext = createContext();
// FAKE_USER object for texting
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

// initialStates
const initialStates = {
  user: null,
  isAuthenticated: false,
};
//  Reducer function
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };

    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action type");
  }
}
//  context provider.
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialStates
  );
  // login function checking user email and password for validation.
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  // logout function
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//  Re-useable context function
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext is used outside of AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
