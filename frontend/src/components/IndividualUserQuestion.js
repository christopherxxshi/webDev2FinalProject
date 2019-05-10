import React, { Component } from "react";

class IndividualUserQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: false
        };


    }


    openComments = (e) => {
        e.preventDefault();
        console.log("Hello....");
        this.setState({ showComments: !this.state.showComments })
    }



    render() {
        return (
            <div className="centerAlign">
                <div className="userBody">
                    <div className="box" onClick={this.openComments}>
                        <div className="content">
                            <h2>Title</h2>
                            <p>
                                Description

                        </p>
                        </div>
                    </div><br />

                    {(this.state && this.state.showComments) ?
                        <div className="box1">
                            <p>Comments</p>
                            <div className="clsUsername"> 
                                <div className="spacer"></div>
                                <p>-Username</p>
                            </div>
                            

                        </div>
                        :
                        null
                    }
                </div>
            </div>

        )
    }



}

export default IndividualUserQuestion;