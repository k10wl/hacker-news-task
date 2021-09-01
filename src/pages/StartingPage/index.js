import React from "react";
import { Link } from "react-router-dom";
import "./stylesheet.css";

function StartingPage() {
  return (
    <div className="component-root starting-page">
      <h1>
        HackerNews task app
      </h1>
      <h3>This app was build following next requirements: </h3>
      <ul>
        <li>develop an app which makes a request to HackerNews api and lists the result as a table of 3 columns:
          time added, title and domain</li>
        <li>create a project without CRA (create-react-app)</li>
        <li>use React Hooks</li>
        <li>use 1 helper library besides react</li>
        <li>use any flux-like state management strategy(useReducer hook, flux utilities, context)</li>
        <li>table headers should be clickable and should sort the entries by according column</li>
        <li>upon reaching end of page load new entries using pagination api (infinity scroll)</li>
        <li>entry should be clickable and should lead to HackerNews comments(link)</li>
        <li>implement mobile version which consists of entry title column only (fills screen completely) and has floating sort by date button</li>
        <li>make table adaptive: breakline entries, truncate by ellipsis any overflow that doesn't fit into 3 lines</li>
      </ul>

      <h3>Please, navigate to <Link to="/news">News</Link> or <Link to="/newest">Newest</Link> tab to proceed.</h3>
    </div>
  );
}

export default StartingPage;
