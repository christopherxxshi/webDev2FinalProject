import React from "react";
import { connect } from "react-redux";
// import Link from "next/link";
import { Link } from "react-router-dom";
import auth from "../config/auth";
import { signOut } from "../action/index";


class AuthUser extends React.Component {


    signOut = async () => {

        console.log("signOut in AuthUser");

        var signOut = false;

        await auth.auth().signOut().then(function () {
            // Sign-out successful.
            // console.log("inside auth signin")
            // this.props.signOut();

            signOut = true;

        }).catch(function (error) {
            // An error happened.
        });

      if(signOut){
          this.props.signOut();
      }

    }


    render() {
        return (
            <div className="d-flex">

                <div className="btn-group">
                    <button type="button" className="btn btn-secondary">

                        <img ref={React.createRef()}
                            alt={this.props.auth.name}
                            src={this.props.auth.imgUrl}
                            width="30px" height="30px" />

                        {this.props.auth.name}
                    </button>

                    <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                        <span className="sr-only">Toggle Dropdown</span>
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                        <Link to="/setting"><a>Setting</a></Link>
                        {/* <a className="dropdown-item" href="#">Setting</a> */}
                        <div className="dropdown-divider"></div>

                        <button className="dropdown-item" onClick={this.signOut}>Sign Out</button>

                        {/* <a className="dropdown-item" href="#">Sign Out</a> */}
                    </div>
                </div>

            </div>
        )
    }

}


const mapStateToProps = (state) => {

    // console.log(state.auth);

    return { auth: state.auth };
};

export default connect(mapStateToProps, { signOut })(AuthUser);