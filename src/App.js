import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NewsTab from "./pages/NewsTab";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/news" component={NewsTab} />
        <Route path="/newest" component={NewsTab} />
      </Switch>
    </Router>
  );
}

export default App;
