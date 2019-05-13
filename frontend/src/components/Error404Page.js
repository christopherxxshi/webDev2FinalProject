import React, { Component } from "react";
import '../style/ErrorDisplay.css'

class Error404Page extends Component {

    render() {
        return (
            <div className="mainBody">
                <div class="">
                </div>

                <div class="error">
                    <h1 className="errorh1">404</h1>
                    <p className="errorP">Sorry. The page your are lookng for, does not Exist!!!</p>

                    <a href="#"><div className="btnerror">Go Home</div></a>
                </div>


            </div>
        );
    }
}

export default Error404Page;