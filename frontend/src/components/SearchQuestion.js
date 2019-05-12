import React, { Component } from "react";
import data from "../api";
import { Link } from "react-router-dom";
import questions from "../reducers/questions";

class SearchQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined,
      loading: false,
      searchTerm: undefined,
      searchData: undefined
    };
  }

//   async getQuestions() {
//     try {
        
//       const response = await data.post(`/api/question/search`, {
//         term: this.state.searchTerm,
//     });
//       this.setState({ data: response.data });
//     } catch (e) {
//       console.log(e);
//     }
//   }
//   componentDidMount() {
//     this.searchQuestions();
//   }

  handleChange = e => {
    let value = e.target.value;
    console.log("Search term",value);
    this.setState({ searchTerm: value }, () => {
      this.searchQuestions();
    });
  };

  onSubmit(e) {
    e.preventDefault();
  }
  
  async searchQuestions() {
    if (this.state.searchTerm) {
      try {
        const response = await data.post(`/api/question/search`, {
            term: this.state.searchTerm,
        });
        console.log("response",response);
        this.setState({ searchData: response.data });
      } catch (e) {
        console.log(e);
      }
    }
  }
  render() {
    let body = null;
    let li = null;
    if (this.state.searchTerm) {
      li =
        this.state.searchData &&
        this.state.searchData.map(questions => {
          let show = questions.desc;
          return (
            <li key={show.id}>
              {show}
              {/* <Link to={`/shows/${show.id}`}>{show.name}</Link> */}
            </li>
          );
        });
    }  
    body = (
      <div>
        <form method="POST " name="formName" onSubmit={this.onSubmit}>
          <label>
            {" "}
            Search Question:
            <input type="text" name="searchTerm" onChange={this.handleChange} />
          </label>
        </form>
        <ul className="list-unstyled">{li}</ul>
      </div>
    );
    return body;
  }
}

export default SearchQuestion;
