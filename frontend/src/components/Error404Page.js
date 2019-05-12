import React, { Component } from "react";

class Error404Page extends Component {

    render() {
        return (
            <div className="mainBody">
                <div class="filter">
                </div>

                <div class="error">
                    <h1>404</h1>
                    <p>Sorry. The page your are lookng for, does not Exist!!!</p>

                    <a href="#"><div class="btn">Go Home</div></a>
                </div>


            </div>
        );
    }
}

export default Error404Page;