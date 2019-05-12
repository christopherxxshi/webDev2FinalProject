import React from "react";
import { getSignleQuestion, addComment } from "../action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

import "../style/SingleQuestion.css";

class SingleQuestion extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: ""
        }
    }

    async componentDidMount() {
        await this.props.getSignleQuestion(this.props.match.params.quesId);
    }


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


    comments = (data) => {

        // console.log(data);

        var comments = data.map(comment => {
            return (
                <div key={comment._id}>
                    {/* {comment.comment} */}
                    <div className="card">
                        <div className="card-header">
                            {`{}`}
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <p>{comment.comment}</p>
                                <footer className="blockquote-footer"><cite title="Source Title">{comment.userId}</cite></footer>
                            </blockquote>
                        </div>
                    </div>
                </div>
            );
        });

        return comments;

    }

    render() {

        var indiQuestion;

        if (this.props.question || this.props.question["_id"] === this.props.match.params.quesId) {

            indiQuestion = (
                <div>
                    <h1>{this.props.question.title}</h1>
                    <hr />

                    <div className="row ">
                        <div className="col-lg-3 col-sm-12 col-md-3">
                            <div className="row text-center">
                                <div className="col-lg-12">
                                    {this.props.question.upVote}
                                    <br />
                                    <FontAwesomeIcon
                                        className="displayBtn"
                                        icon={faThumbsUp}
                                        style={{ fontSize: '1.75em' }} />
                                    <hr />

                                </div>
                                <div className="col-lg-12">
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
                                        <img src={this.props.auth.imgUrl}></img>
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-sm-12 ">
                                        <p>{this.props.auth.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <hr />
                    <div>
                        {this.comments(this.props.question.comments)}
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

    return {
        question: state.question,
        auth: state.auth
    };

}


export default connect(mapStateToProps, { getSignleQuestion, addComment })(SingleQuestion);