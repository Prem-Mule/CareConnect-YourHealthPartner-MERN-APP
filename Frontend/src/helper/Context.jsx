// /* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import App from "../App";

export const usercontext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export const AppWrapper = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <usercontext.Provider
      value={{ isAuthenticated, setIsAuthenticated, user, setUser }}
    >
      <App />
    </usercontext.Provider>
  );
};
