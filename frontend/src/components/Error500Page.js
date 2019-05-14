import React, { Component } from "react";
import {Link} from "react-router-dom";

class Error500Page extends Component {

    render() {
        return (
            <div className="mainBodyFor500">
                <div class="">
                </div>

                <div class="error2">
                    <h1 className="errorh1">500</h1>
                    <p>Internl server Error. We will be back soon... :-)</p>
                    <br />

                    <Link to="/" className="errorA"><div className="btnerror">Go Home</div></Link>
                </div>


            </div>
        );
    }


}

export default Error500Page