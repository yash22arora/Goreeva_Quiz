import Create from "./pages/Create";
import Edit from "./pages/Edit";
import { Switch, Route, Redirect } from "react-router-dom";
import PlayQuiz from "./pages/Play";
import Home from "./pages/Home";
import LoginIcon from "./components/Login/Login";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <div className="App px-16 py-12 m-0">
      <LoginIcon />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/edit/:quizId">
          <Edit />
        </Route>
        <Route path="/play/:quizId">
          <PlayQuiz />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
