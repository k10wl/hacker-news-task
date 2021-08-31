import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import NewsTab from "./pages/NewsTab";

function App() {
  return (
    <Router>
      <Link to="/news">• news</Link>
      <span>|</span>
      <Link to="/newest">• newest</Link>
      <Switch>
        <Route exact path="/news" component={(props) => <NewsTab {...props} />}/>
        <Route exact path="/newest" component={(props) => <NewsTab {...props} />}/>
      </Switch>
    </Router>
  );
}

export default App;
