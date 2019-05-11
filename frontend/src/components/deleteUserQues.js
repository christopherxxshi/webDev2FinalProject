import React from "react";
import ReactModal from 'react-modal';
import { Link } from "react-router-dom";



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

    componentDidMount() {
        console.log(this.props);
    }

    handleSubmit = async () => {

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
                            Are you sure you want to delete Question .
                        </h4>

                        <hr />

                        <div className="float-right">
                            <button className="btn " onClick={this.handleSubmit.bind(this)}>
                                Delete
                        </button>
                            <Link className="link" to="/">
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

export default DeleteUserQues;