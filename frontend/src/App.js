import React from 'react';
import './App.css';
// import { Provider } from "react-redux";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Header from "./components/Header";
import DisplayPosts from "./components/DisplayPosts.js"

function App() {
  return (
    <div>
      <Router history={history}>
      <Header />
        <Switch>
          <Route component={DisplayPosts}></Route>
        </Switch>
      </Router>

</div>


  );
}

export default App;
