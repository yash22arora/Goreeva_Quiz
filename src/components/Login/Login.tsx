import { useContext, useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import Button from "../common/Button/Button";
import AuthContext from "../../store/auth-context";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useHistory, useLocation } from "react-router-dom";

const LoginIcon = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authCtx = useContext(AuthContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const handleLogout = () => {
    authCtx.logout();
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        authCtx.login(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        setIsMenuOpen(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        history.push("/");
      });
  };

  useEffect(() => {
    const pathnames = pathname.split("/");
    if (pathnames.includes("create") || pathnames.includes("edit")) {
      if (!authCtx.isLoggedIn) {
        handleLogin();
      }
    }
  }, [pathname, authCtx]);

  const MenuContent = () => {
    if (authCtx.isLoggedIn)
      return (
        <div className="flex flex-col items-start justify-center w-max text-base">
          <span className="p-2 px-4 border-b border-slate-700 w-full cursor-default font-bold">
            {authCtx.user?.displayName}
          </span>
          <span
            className="p-2 px-4 w-full hover:bg-slate-500 hover:bg-opacity-30"
            onClick={handleLogout}
          >
            Logout
          </span>
        </div>
      );
    else
      return (
        <div className="p-3">
          <Button
            className="w-48 mt-0 flex flex-row items-center text-base justify-center gap-3"
            onClick={handleLogin}
          >
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>
      );
  };

  return (
    <div className="relative z-10">
      {isMenuOpen && (
        <div
          className="absolute w-screen h-screen"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        ></div>
      )}
      <div className="absolute cursor-pointer -right-6 -top-6 ">
        <div
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          className="text-gray-300 p-2"
        >
          <BiUser size={40} />
        </div>
        {isMenuOpen && (
          <div className="absolute top-12 right-0 border-[0.5px] border-gray-900 bg-slate-700 backdrop-blur-md bg-opacity-30 min-w-[80px] text-gray-300">
            <MenuContent />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginIcon;
