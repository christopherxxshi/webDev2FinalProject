import React, { Component } from "react";

class Error400Page extends Component {

    render() {
        return (
            <div className="mainBodyFor400">
                <div class="filter">
                </div>

                <div class="error400">
                    <h1>400</h1>
                    <p>Bad Request was sent</p>
                    <br />
                    <a href="#"><div class="btn">Go Home</div></a>
                </div>


            </div>
        );
    }


}

export default Error400Page;