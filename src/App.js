import React from "react";
import "./App.scss";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { GlobalStateProvider } from "./state/GlobalStateContext";
import { AuthProvider } from "./state/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import PageNotFound from "./components/PageNotFound";
import Main from "./Main";
import Nav from "./components/Nav";
import HomePage from "./components/HomePage";
import ViewDaily from "./views/ViewDaily";
import ViewWeekly from "./views/ViewWeekly";
import ViewMonthly from "./views/ViewMonthly";
import ViewSummary from "./views/ViewSummary";
import AppHeader from "./components/AppHeader";

export const history = createBrowserHistory();

export const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  // console.log(action, location.pathname, location.state);
  // console.log(`location`, location.state);
});

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <GlobalStateProvider>
          <div className="App">
            <Nav />
            <Main>
              <AppHeader />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <ProtectedRoute path="/main" component={withRouter(Main)} />
                <ProtectedRoute
                  path="/daily"
                  component={withRouter(ViewDaily)}
                />
                <ProtectedRoute
                  path="/weekly"
                  component={withRouter(ViewWeekly)}
                />
                <ProtectedRoute
                  path="/monthly"
                  component={withRouter(ViewMonthly)}
                />
                <ProtectedRoute
                  path="/summary"
                  component={withRouter(ViewSummary)}
                />
                <Route component={PageNotFound} />
              </Switch>
            </Main>
          </div>
        </GlobalStateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
