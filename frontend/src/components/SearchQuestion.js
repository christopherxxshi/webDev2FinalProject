import React, { Component } from "react";
import data from "../api";
import { Link, } from "react-router-dom";
import questions from "../reducers/questions";
import "../style/socialMedia.css";
// 

// Searching the questions using Fuzzy logic
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
        console.log("Search term", value);
        this.setState({ searchTerm: value }, () => {
            this.searchQuestions();
        });
    };

    onSubmit(e) {
        e.preventDefault();
    
      //  e.target.reset();
      //  this.handleChange(e);
    }

    async searchQuestions() {
        if (this.state.searchTerm) {
            try {
                const response = await data.post(`/api/question/search`, {
                    term: this.state.searchTerm,
                });
                console.log("response", response);
                this.setState({ searchData: response.data });
            } catch (e) {
                console.log(e);
            }
        }
    }
    // async historyPush(to) {
    //     RedirectProps.push(to);
    // }
    render() {
        let body = null;
        let li = null;
        let length=0;
        
        console.log("len",length);
        if (this.state.searchTerm) {
            li =
                this.state.searchData &&
                this.state.searchData.map(questions => {
                    //let show = questions.desc;
                    length++;
                    let countAns=0;
                    let comments = questions.comments.length == 0 ? "No Comments" :
                        questions.comments.map(comments => {
                            countAns++;
                            return (
                                <li key={comments._id}>
                                    Comments:{comments.comment}
                                </li>
                            )
                        });
                    return (
                        <li key={questions._id}>
                            {/* <b>Language Category: </b> */}
                            {/* {questions.language} */}
                            <br />
                            {/* <b>Question:</b> */}
                            
                            <Link className ="myLink" to={`/singleQuestion/${questions._id}`}  >                  
                                (Q){questions.title} ({countAns} Answers)                 
                                </Link>
<br />
                            {/* <b>Comments:</b>
                            {comments} */}
                            {/* <Link to={`/shows/${show.id}`}>{show.name}</Link> */}
                        </li>
                    );
                });
        }
        body = (
            <div className="search">
                <form method="POST " name="formName" onSubmit={this.onSubmit}>
                    <input type="text" name="searchTerm" className="searchTerm"  placeholder=" Search Questions..." onChange={this.handleChange} />
                </form>
                {length > 0 ? length+" results" : ""}
                <ul className="list-unstyled">{li}</ul>
            </div>
        );
        return body;
    }
}

export default SearchQuestion;
