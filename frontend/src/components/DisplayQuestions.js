import React, { Component } from "react";
import history from "../history";
import { askQuestions } from "../action/index";
import { connect } from "react-redux";

class DisplayQuestions extends Component {


    constructor(props) {
        super(props);

        this.state = {
            title: null,
            description: null,
            language: "Java"
        }
    }

    handleChangeInput = (event) => {
        // console.log(event.target);
        // console.log(event.target.value)
        this.setState({ title: event.target.value })
        // this.setState({event})
    };

    handleChangeTextArea = (e) => {
        // e.preventDefault();
        this.setState({ description: e.target.value })

    };

    handleChangeSelect = (e) => {
        // e.preventDefault()
        // console.log(e.target.value);
        this.setState({ language: e.target.value })
    };

    uploadHandler = async (event) => {
        event.preventDefault();
    
        let formData = new FormData();
        formData.append('imgFile', this.uploadInput.files[0]);
        console.log(formData);

        if (this.uploadInput.files[0].size / 1024 / 1024 >  3) {
            // Post to resize route
            try {
                console.log("Resize route");
                await fetch('http://localhost:3001/api/image/resizeImg', {
                    method: 'POST',
                    body: formData
                });
            } catch (error) {
                console.error(error);
            }
        } else {
            // Can just upload
            console.log("Straight upload route");
            try {
                await fetch('http://localhost:3001/api/image/uploadImg', {
                method: 'POST',
                body: formData
                });
                console.log("Upload done");
            } catch (error) {
                console.error(error);
            }
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        await this.props.askQuestions(this.props.auth, this.state);


    }

    canbeSubmitted() {
        if (this.state.title != null && this.state.description != null) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="wrapper">

                <div className="form-wrapper">
                    <div>
                        <h1>Post your Question</h1>
                        <hr />
                    </div>

                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="title">
                            <label htmlFor="title">Enter your title</label>
                            <br />
                            <input type="text" required className="" placeholder="title" name="title" onChange={this.handleChangeInput.bind(this)}></input>
                        </div>
                        <div className="description">
                            <label htmlFor="description">Enter your Description</label>
                            <br />
                            <textarea rows="7" cols="67" required placeholder="Enter Description" name="description" onChange={this.handleChangeTextArea.bind(this)}>
                            </textarea>
                        </div>
                        <div className="language">
                            <label htmlFor="language">Select Language</label>
                            <select onChange={this.handleChangeSelect}>
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
                                <input ref={(ref) => { this.uploadInput = ref;}} type="file"/>

                                <div className=" post tect-center float-left">
                                    <button disabled={!(this.state.title && this.state.description && this.state.language)}
                                        className=" btn" type="submit">Post</button>
                                </div>


                                <div className="float-right tect-center">
                                    <button className="btn" onClick={() => history.push("/")}>Cancel</button>
                                </div>
                            </div>

                        </span>

                    </form>

                </div>


                {/* <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br /> */}
            </div>
        );
    }
}

// export default DisplayQuestions;

const mapsStsteToProps = (state) => {

    return { auth: state.auth };
}

export default connect(mapsStsteToProps, { askQuestions })(DisplayQuestions)