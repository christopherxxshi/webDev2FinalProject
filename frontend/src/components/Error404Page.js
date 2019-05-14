import React, { Component } from "react";
import '../style/ErrorDisplay.css'
import {Link} from "react-router-dom";

class Error404Page extends Component {

    render() {
        return (
            <div className="mainBody">
                <div class="">
                </div>

                <div class="error">
                    <h1 className="errorh1">404</h1>
                    <p className="errorP">Sorry. The page your are lookng for, does not Exist!!!</p>

                    <Link to="/"><div className="btnerror">Go Home</div></Link>
                </div>


            </div>
        );
    }
}

export default Error404Page;