import React from "react";
// import SideBar from "./Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { displayQuestions, updateQuestion } from "../action/index";
import { connect } from "react-redux";
import NoContent from "./NoContent";
import { Link } from "react-router-dom";
import SideNavBar from "./SideNavBar";

import "../style/DisplayPosts.css";

class DisplayPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upVote: null,
            downVote: null,
            language: "Recent Asked Questions",
            render: false
        }
    }


    async componentDidMount() {


        // this.setState({ render: true });

        // console.log("single question");

        await this.props.displayQuestions();



    }


    onClick = async (event) => {

        let arr = event.split(" ");

        let obj = {};

        obj[arr[0]] = Number(arr[2]) + 1;

        await this.props.updateQuestion(arr[1], obj);

    }

    // async componentDidUpdate() {
    //     console.log(this.props);
    // }



    render() {

        var allQuestions = [];
        //  console.log(this.props.questions);
        if (this.props.questions !== undefined) {

            if (this.props.questions.length != 0) {

                allQuestions = this.props.questions.map(question => {
                    if (question != null) {
                        return (


                            <div key={question._id}>
                                <hr />
                                <div className="row">
                                    <div className="col-lg-3 col-md-4 col-xs-12">
                                        {/* <div className="row">
                                    <div className="col-lg-4 col-sm-4  col-md-4 text-center">
                                        <div name="upVote" onClick={() => this.onClick.bind(this)(`upVote ${question._id} ${question.upVote}`)} >
                                            <FontAwesomeIcon
                                                className="displayBtn"
                                                icon={faThumbsUp}
                                                style={{ fontSize: '1.75em', border: "none" }} />

                                            <br />
                                            {question.upVote}
                                            <br />
                                            Vote
                                        </div>

                                    </div>
                                    <div className="col-lg-4 col-sm-4 col-md-4 text-center">

                                        <FontAwesomeIcon
                                            className="displayBtn"
                                            icon={faCommentMedical}
                                            style={{ fontSize: '1.75em' }} />

                                        <br />
                                        {question.comments.length}
                                        <br />
                                        Answers
                                    </div>
                                    <div className="col-lg-4 col-sm-4 col-md-4  text-center">

                                        <FontAwesomeIcon
                                            className="displayBtn"
                                            icon={faThumbsDown}
                                            style={{ fontSize: '1.75em' }} />


                                        <br />
                                        {question.downVote}
                                        <br />
                                        Awful
                                    </div>
                                </div> */}
                                        <div className="text-center">
                                            <h3 className="languageSize">{question.language}</h3>
                                        </div>

                                    </div>
                                    <div className="col-lg-9  col-md-8 col-xs-12">
                                        <Link to={`/singleQuestion/${question._id}`}>
                                            <h2 className="frontBigtitle">
                                                {question.title}
                                            </h2>
                                        </Link>
                                        <p>Comments : {question.comments.length}</p>
                                    </div>
                                </div>
                                <hr />
                            </div>

                        )
                    }
                })

            }
            else {
                allQuestions = (

                    <div>
                        <NoContent ></NoContent>
                    </div>

                )
            }

        }
        else {
            allQuestions = (

                <div>
                    <NoContent ></NoContent>
                </div>

            )
        }

        return (
            <div>

                <div className="container displayPostBody">


                    <div className="plate">
                        <p className="script"><span>Recently Asked Question</span></p>
                        {/* <p className="shadow text1">{this.state.language}</p> */}
                        {/* <p className="shadow text2">{this.state.language}</p> */}
                        {/* <p className="shadow text3">SAUCE</p> */}
                        {/* <p className="script"><span>by Ibrahim</span></p> */}
                    </div>

                    {/* <h1 className="text-center">{this.state.language}</h1> */}
                    <SideNavBar></SideNavBar>
                    {allQuestions}
                </div>



            </div>
        )
    }

}


// export default DisplayPosts;


const mapStateToProps = (state) => {

    // console.log("display component");

    // console.log(state.questions);

    // console.log("state.questions.question");

    return { questions: state.questions.question, language: state.language.language };
};

export default connect(mapStateToProps, { displayQuestions, updateQuestion })(DisplayPosts);