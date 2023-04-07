import { User, signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase.config";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  user: null as User | null,
  isLoggedIn: false,
  login: (user: User) => {},
  logout: () => {},
});

export const AuthContextProvider = (props: any) => {
  const history = useHistory();
  const initialUser = localStorage.getItem("user");

  const [user, setUser] = useState<User | null>(
    !!initialUser ? JSON.parse(initialUser) : null
  );

  const userIsLoggedIn = !!user;
  const loginHandler = (user: User) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user");
        history.push("/");
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

export default AuthContext;
