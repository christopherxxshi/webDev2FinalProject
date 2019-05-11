import React from "react";
import { getSignleQuestion } from "../action";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

class SingleQuestion extends React.Component {

    async componentDidMount() {
        await this.props.getSignleQuestion(this.props.match.params.quesId);
    }

    render() {

        var indiQuestion;

        if (this.props.question || this.props.question["_id"] === this.props.match.params.quesId) {

            indiQuestion = (
                <div>
                    <h1>{this.props.question.title}</h1>
                    <hr />

                    <div className="rows">
                        <div className="col-lg-4 col-sm-12 col-md-3">
                            <div className="rows text-center">
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

    return { question: state.question };

}


export default connect(mapStateToProps, { getSignleQuestion })(SingleQuestion);