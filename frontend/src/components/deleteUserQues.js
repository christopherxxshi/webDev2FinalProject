import React from "react";
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";
import { getSignleQuestionUser, deleteUserQuestion } from "../action";
import { connect } from "react-redux";


ReactModal.setAppElement("#root");
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        border: "1px solid #28547a",
        borderRadius: "4px"
    }
};


class DeleteUserQues extends React.Component {
constructor(props){
    super(props)
    
}


    async componentDidMount() {

        await this.props.getSignleQuestionUser(this.props.match.params.quesId);
        // console.log(getQuestion);
        // this.setState({title : this.props.question})

    }

    handleSubmit = async () => {

        console.log(this.props.match.params);
        await this.props.deleteUserQuestion(this.props.match.params.quesId);

    }

    render() {

        var open = true;
        return (
            <div className="deleteQuote">
                <div>
                    <h1>
                        Delete Quote
                </h1>



                    <ReactModal
                        name="Delete Question"
                        isOpen={open}
                        contentLabel="Delete Question"
                        style={customStyles}
                    >

                        Delete Question

                    <hr />

                        <h4>
                            Are you sure you want to delete Question "{`${this.props.question.title}`}".
                        </h4>

                        <hr />

                        <div className="float-right">
                            <button className="btn " onClick={this.handleSubmit.bind(this)}>
                                Delete
                        </button>
                            <Link className="link" to="/userQuestions">
                                <button className="btn ">
                                    Cancel
                        </button>
                            </Link>

                        </div>

                    </ReactModal>



                </div>

            </div>
        )
    }

}

// export default DeleteUserQues;


const mapStateToProps = (state) => {

    return { question: state.question };

}


export default connect(mapStateToProps, { getSignleQuestionUser, deleteUserQuestion })(DeleteUserQues);