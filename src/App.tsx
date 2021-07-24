import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./routes/Landing/Landing";
import Main from "./routes/Main/Main"

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/main" component={Main} />
        <Route render={() => <h1>404 Not Found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
