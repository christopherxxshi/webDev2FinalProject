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
import { connect } from "react-redux";

import AskQuestion from "./components/AskQuestion";
//import DisplayQuestions from "./components/DisplayQuestions";
import SubmitImage from './components/SubmitImage';

// function App(props) {
class App extends React.Component {

  componentDidMount(){
    console.log(this.props);
  }

  render(){

  return (
    <div>
      <Router history={history}>
        <Header />
        {this.props.auth.email ? <AskQuestion></AskQuestion> : null}
        <Switch>
          <Route component={DisplayPosts}></Route>
        </Switch>
        <Route component={SubmitImage}></Route>
      </Router>
      <Footer></Footer>

    </div>


  );
  }
}

// export default App;

const mapStateToProps = (state) => {

  console.log("app connect")
  console.log(state);

  return { auth: state.auth };

}

export default connect(mapStateToProps)(App);
