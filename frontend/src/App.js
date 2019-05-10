import React from 'react';
import './App.css';
// import { Provider } from "react-redux";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Header from "./components/Header";
import DisplayPosts from "./components/DisplayPosts.js"
import Footer from "./components/Footer";
// import question from "./images/question.png"

import AskQuestion from "./components/AskQuestion";
import DisplayQuestions from "./components/DisplayQuestions";

function App() {
  return (
    <div>
      <Router history={history}>
        <Header />
        <AskQuestion></AskQuestion>
        <Switch>
          <Route component={DisplayPosts}></Route>
        </Switch>
      </Router>

      <Footer></Footer>

    </div>


  );
}

export default App;
