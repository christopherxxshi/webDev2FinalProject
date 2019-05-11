import React from "react";
// import SideBar from "./Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faCommentMedical } from '@fortawesome/free-solid-svg-icons';
import { displayQuestions, updateQuestion } from "../action/index";
import { connect } from "react-redux";
import NoContent from "./NoContent";
import { Link } from "react-router-dom";

class DisplayPosts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upVote: null,
            downVote: null
        }
    }


    async componentDidMount() {

        await this.props.displayQuestions();


    }


    onClick = async (event) => {

        let arr = event.split(" ");

        let obj = {};

        obj[arr[0]] = Number(arr[2]) + 1;

        await this.props.updateQuestion(arr[1], obj);

    }




    render() {

        var allQuestions = [];

        if (this.props.questions) {

            allQuestions = this.props.questions.map(question => {
                return (

                    <div key={question._id}>
                        <hr />
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-xs-12">
                                <div className="row">
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
                                </div>

                            </div>
                            <div className="col-lg-9  col-md-8 col-xs-12">
                                <Link to={`/singleQuestion/${question._id}`}>
                                    <h2>
                                        {question.title}
                                    </h2>
                                </Link>
                            </div>
                        </div>
                        <hr />
                    </div>

                )
            })

        }
        else {
            allQuestions = <NoContent msg="There are no Posts."></NoContent>
        }

        return (
            <div>

                <div className="container">
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

    return { questions: state.questions.question };
};

export default connect(mapStateToProps, { displayQuestions, updateQuestion })(DisplayPosts);