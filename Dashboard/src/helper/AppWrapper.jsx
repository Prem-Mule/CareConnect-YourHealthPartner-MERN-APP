// /* eslint-disable no-unused-vars */
import { createContext, useState } from "react";
import App from "../App";

export const usercontext = createContext({});

const AppWrapper = () => {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <usercontext.Provider
      value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}
    >
      <App />
    </usercontext.Provider>
  );
};
export default AppWrapper;
