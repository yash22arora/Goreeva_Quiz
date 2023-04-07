import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.config";

const AuthContext = React.createContext({
  user: {},
  isLoggedIn: false,
  login: (user: any) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const initialUser = localStorage.getItem("user");

  const [user, setUser] = useState(
    !!initialUser ? JSON.parse(initialUser) : null
  );

  const userIsLoggedIn = !!user;
  const loginHandler = (user: any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const contextValue = {
    user: user,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
