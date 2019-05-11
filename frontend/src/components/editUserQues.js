import React from "react";
import { getSignleQuestion, updateUserQuestion } from "../action";
import { connect } from "react-redux";
import history from "../history";

class EditUserQues extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            quesId: "",
            description: "",
            language: ""
        }
    }

    async componentDidMount() {
        this.setState({ quesId: this.props.match.params.quesId });
        await this.props.getSignleQuestion(this.props.match.params.quesId);

        console.log(this.props.question.title);
        this.setState({ title: this.props.question.title });
        this.setState({ description: this.props.question.desc });
        // this.setState({ language: this.props.question.language });


    }

    handleChange = async (event) => {

        this.setState({ [event.target.name]: event.target.value });



    }


    handleSubmit = async (e) => {
        e.preventDefault();

        await this.props.updateUserQuestion(this.state);

    }

    render() {
        return (
            <div className="wrapper">

                <div className="form-wrapper">
                    <div>
                        <h1>Edit your Question</h1>
                        <hr />
                    </div>

                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="title">
                            <label htmlFor="title">Edit Title</label>
                            <br />
                            <input type="text" value={this.state.title} required className="" placeholder="title" name="title" onChange={this.handleChange.bind(this)}></input>
                        </div>
                        <div className="description">
                            <label htmlFor="description">Enter Description</label>
                            <br />
                            <textarea rows="7" cols="67" value={this.state.description} required placeholder="Enter Description" name="description" onChange={this.handleChange.bind(this)}>
                            </textarea>
                        </div>
                        <div className="language">
                            <label htmlFor="language">Select Language</label>
                            <select name="language" value={this.state.language} onChange={this.handleChange.bind(this)}>
                                <option value="Java">Java</option>
                                <option value="JavaScript">JavaScript</option>
                                <option value="Python">Python</option>
                                <option value="Objective-C">Objective-C</option>
                                <option value="TypeScript">TypeScript</option>
                                <option value="C++">C++</option>
                                <option value="C">C</option>
                                <option value="C#">C#</option>
                                <option value="Others">Others</option>
                            </select>
                            <hr />
                        </div>
                        <span>

                            <div>


                                <div className=" post tect-center float-left">
                                    <button disabled={!(this.state.title && this.state.description && this.state.language)}
                                        className=" btn" type="submit">Update</button>
                                </div>


                                <div className="float-right tect-center">
                                    <button className="btn" onClick={() => history.push("/userQuestions")}>Cancel</button>
                                </div>
                            </div>

                        </span>

                    </form>

                </div>

            </div>
        )
    }


}


// export default EditUserQues;

const mapStateToProps = (state) => {

    return { question: state.question };

}


export default connect(mapStateToProps, { getSignleQuestion, updateUserQuestion })(EditUserQues);