import React from "react";
import { getSignleQuestion, addComment, updateQuestion } from "../action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import axios from "axios";
import "../style/SingleQuestion.css";
import Axios from "axios";

class SingleQuestion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            question: {},
            comment: ""
        }
    }

    async componentDidMount() {
        console.log("get");
        await this.props.getSignleQuestion(this.props.match.params.quesId);


        // let question = await axios({
        //     url: `http://localhost:3001/api/question/${this.props.match.params.quesId}/`,
        //     method: 'get',

        // });


        // this.setState({ question: question.data });
        // console.log(this.state.question)


    }

    // async componentDidUpdate(){
    //     console.log("get");
    //     await this.props.getSignleQuestion(this.props.match.params.quesId);
    // }


    handleChange = (event) => {
        // console.log(event.target.value)
        this.setState({ comment: event.target.value });
    }

    onSubmit = async (event) => {
        // console.log(this.state.comment);

        let obj = {
            userId: this.props.auth.userId,
            comment: this.state.comment
        }

        this.setState({ comment: "" });

        await this.props.addComment(this.props.match.params.quesId, obj);
    }


    onClick = async (event) => {

        let arr = event.split(" ");

        let obj = {};

        obj[arr[0]] = Number(arr[2]) + 1;

        await this.props.updateQuestion(arr[1], obj, this.props.auth.userId);

    }


    comments = (data) => {

        console.log(data);
        if (data) {
            var comments = data.map(comment => {
                return (
                    <div key={comment._id}>
                        {/* {comment.comment} */}
                        <div className="card">
                            <div className="card-header">
                                <p>{`On ${comment.date} at ${comment.time}.`}</p>
                            </div>
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <p>{comment.comment}</p>
                                    <footer className="blockquote-footer"><cite title="Source Title">{comment.userDetails.emailId} ({comment.userDetails.username})</cite></footer>
                                </blockquote>
                            </div>
                        </div>
                        <br />
                    </div>
                );
            });

            return comments;
        } else {
            return (
                <div>
                    <p>
                        No Comments
                    </p>
                </div>
            )
        }

    }

    // componentDidUpdate() {
    //     if (this.props.match.params.quesId === this.state.question._id) {
    //         this.setState({ question: this.props.question });
    //     }
    // }

    render() {



        let indiQuestion;
        console.log(this.props.question);
        if ( this.props.question["_id"] === this.props.match.params.quesId) {
        // if (this.state.question) {

            indiQuestion = (
                <div>
                    <h1>{this.props.question.title}</h1>
                    {/* <h1>{this.state.question.title}</h1> */}
                    <hr />

                    <div className="row ">
                        <div className="col-lg-3 col-sm-12 col-md-3">
                            <div className="row text-center">
                                <div className="col-lg-12"
                                    onClick={() => this.onClick.bind(this)(`upVote ${this.props.question._id} ${this.props.question.upVote}`)}>
                                    {this.props.question.upVote}
                                    <br />
                                    <FontAwesomeIcon
                                        className="displayBtn"
                                        icon={faThumbsUp}
                                        style={{ fontSize: '1.75em' }} />
                                    <hr />

                                </div>

                                <div className="col-lg-12"
                                    onClick={() => this.onClick.bind(this)(`downVote ${this.props.question._id} ${this.props.question.downVote}`)}>
                                    {this.props.question.downVote}
                                    <br />
                                    <FontAwesomeIcon
                                        className="displayBtn"
                                        icon={faThumbsDown}
                                        style={{ fontSize: '1.75em' }} />
                                    <br />

                                </div>
                            </div>
                        </div>


                        <div className="col-lg-8 col-md-9 col-sm-12">
                            {this.props.question.desc}
                        </div>
                    </div>
                    <br />

                    <div className="autherCard mt-3 mb-3">
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-lg-12 text-center">
                                {`${this.props.question.time} on ${this.props.question.date}`}
                            </div>
                            <div className="col-md-12 col-lg-12 col-sm-12 ">
                                <div className="row">
                                    <div className="col-md-6 col-lg-6 col-sm-12 text-center">
                                        {/* <img src={this.props.question.userDetail.imagePath} className="userImg"></img> */}
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 ">
                                        {/* <p>{this.props.question.userDetail.username}</p> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div>
                        {/* {this.props.question.comments.length > 0 ? */}
                        {this.props.question.comments.length > 0 ?
                            this.comments(this.props.question.comments)
                            :
                            null
                        }

                    </div>

                    <hr />

                    {
                        this.props.auth.userId ?
                            (
                                <div className="Entercomment">
                                    <textarea rows="7" cols="67" value={this.state.comment} required
                                        placeholder="Enter comment" name="comment" onChange={this.handleChange.bind(this)} />
                                    <div>
                                        <button className="btn btn-primary" onClick={this.onSubmit.bind(this)}>
                                            Post
                                        </button>
                                    </div>

                                </div>
                            )

                            :

                            null
                    }


                </div>

            )

        }

        return (
            <div className="container">
                {indiQuestion}
            </div>
        )
    }



}

const mapStateToProps = (state) => {

    console.log(state);

    return {
        question: state.singleQuestion,
        auth: state.auth
    };

}


export default connect(mapStateToProps, { getSignleQuestion, addComment, updateQuestion })(SingleQuestion);