import React from "react";

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

    componentDidMount() {
        console.log(this.props);
        this.setState({ quesId: this.props.match.params.quesId });
    }

    handleChange = async (event) => {

        // let name = event.target.name;
        // let value = event.target.value;

        // let data = {};
        // data[name] = value;

        this.setState({ [event.target.name]: event.target.value });



    }


    handleSubmit = async (e) => {
        e.preventDefault();

        console.log(this.state);

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
                            <input type="text" required className="" placeholder="title" name="title" onChange={this.handleChange.bind(this)}></input>
                        </div>
                        <div className="description">
                            <label htmlFor="description">Enter Description</label>
                            <br />
                            <textarea rows="7" cols="67" required placeholder="Enter Description" name="description" onChange={this.handleChange.bind(this)}>
                            </textarea>
                        </div>
                        <div className="language">
                            <label htmlFor="language">Select Language</label>
                            <select name="language" onChange={this.handleChange.bind(this)}>
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
                                    {/* <button className="btn" onClick={() => history.push("/")}>Cancel</button> */}
                                </div>
                            </div>

                        </span>

                    </form>

                </div>

            </div>
        )
    }


}


export default EditUserQues;