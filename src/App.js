import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NewsTab from "./pages/NewsTab";
import Comments from "./pages/Comments";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/news" component={(props) => <NewsTab {...props} />}/>
        <Route exact path="/newest" component={(props) => <NewsTab {...props} />}/>
        <Route path="/comments/id:postId" component={(props) => <Comments {...props} />}/>
      </Switch>
    </Router>
  );
}

export default App;
