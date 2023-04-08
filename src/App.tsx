import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { Switch, Route, Redirect } from "react-router-dom";
import PlayQuiz from "./pages/Play";
import Home from "./pages/Home";
import LoginIcon from "./components/Login/Login";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Toaster } from "react-hot-toast";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <LoginIcon />
      <div className="App px-16 py-12 m-0">
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
          }}
        />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/create">
            {authCtx.isLoggedIn ? <Create /> : <Redirect to="/" />}
          </Route>
          <Route path="/edit/:quizId">
            {authCtx.isLoggedIn ? <Edit /> : <Redirect to="/" />}
          </Route>
          <Route path="/play/:quizId">
            <PlayQuiz />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
