import React, { Component } from "react";


class DisplayQuestions extends Component {


    constructor(props){
        super(props);

        this.state = {
            title: null,
            description: null,
            language: "Java"
        }
    }

    handleChangeInput = (event)=>{
        console.log(event.target);
        console.log(event.target.value)
        this.setState({title: event.target.value})
        // this.setState({event})
    };

    handleChangeTextArea = (e) => {
        // e.preventDefault();
        this.setState({description: e.target.value})

    };

    handleChangeSelect = (e) => {
        // e.preventDefault()
        console.log(e.target.value);
        this.setState({language: e.target.value})
    };

    handleSubmit = (e) => {
        e.preventDefault()
        
        if(this.canbeSubmitted()) {
            console.log(this.state.title);
        console.log(this.state.description);
        console.log(this.state.language);
        } else {
            alert('Please fill in the all values');
        }
    }

    canbeSubmitted(){
        if(this.state.title != null && this.state.description != null){
            return true;
        }
        return false;
    }

    render() {
        return (
            <div className="wrapper">

                <div className="form-wrapper">
                    <h1>Post your Question</h1>
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
                        </div>
                        <span>
                        <div className="post">
                            <button type="submit">Post My Questions</button>
                        </div>
                        </span>
                        
                    </form>
                    
                </div>







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
                <br />
                <br />
            </div>
        );
    }
}

export default DisplayQuestions;