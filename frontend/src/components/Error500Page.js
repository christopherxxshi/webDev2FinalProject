import React, { Component } from "react";

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

                    <a href="#" className="errorA"><div className="btnerror">Go Home</div></a>
                </div>


            </div>
        );
    }


}

export default Error500Page