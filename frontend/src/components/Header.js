import React from "react";
import SocialMedia from "./SocialMedia";
import { connect } from "react-redux";
// import Link from "next/link";
import { Link } from "react-router-dom";
import AuthUser from "./AuthUser";
import EmailLogin from "./EmailLogin";

class Header extends React.Component {

    render() {
        return (
            <div >
                <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
                    {/* <h5 className="my-0 mr-md-auto font-weight-normal ">Company name</h5> */}
                    <h5 className="mx-5 mr-md-auto font-weight-normal "><Link to="/"><a>Company name</a></Link></h5>
                    <nav className="my-2 my-md-0 mr-md-3">
                        <div className="float-right">
                            {!this.props.auth.emailVerified ?
                                (<div>
                                    {/* <form className="form-inline">
                                        <div className="form-group mb-2">
                                            <label htmlFor="staticEmail2" className="sr-only">Email</label>
                                            <input type="text" className="form-control" placeholder="Username" id="staticEmail2" />
                                        </div>
                                        <div className="form-group mx-sm-3 mb-2">
                                            <label htmlFor="inputPassword2" className="sr-only">Password</label>
                                            <input type="password" className="form-control" id="inputPassword2" placeholder="Password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary mb-2">Confirm identity</button>
                                    </form> */}

                                    {/* <EmailLogin></EmailLogin> */}

                                    <SocialMedia ></SocialMedia>
                                </div>
                                ) : (

                                    <AuthUser></AuthUser>
                                    // <div className="d-flex">

                                    //     <div className="btn-group">
                                    //         <button type="button" className="btn btn-secondary">

                                    //             <img ref={React.createRef()}
                                    //                 alt={this.props.auth.name}
                                    //                 src={this.props.auth.imgUrl}
                                    //                 width="30px" height="30px" />

                                    //             {this.props.auth.name}
                                    //         </button>

                                    //         <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-reference="parent">
                                    //             <span className="sr-only">Toggle Dropdown</span>
                                    //         </button>

                                    //         <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                                    //             <Link href="/setting"><a>Setting</a></Link>
                                    //             {/* <a className="dropdown-item" href="#">Setting</a> */}
                                    //             <div className="dropdown-divider"></div>

                                    //             <button className="dropdown-item" onClick={this.signOut.bind(this)}>Sign Out</button>

                                    //             {/* <a className="dropdown-item" href="#">Sign Out</a> */}
                                    //         </div>
                                    //     </div>

                                    // </div>
                                )}
                        </div>



                    </nav>

                </div>
            </div>
        )

    }

}


// export default Header;


const mapStateToProps = (state) => {

    console.log(state.auth);

    return { auth: state.auth };
};

export default connect(mapStateToProps)(Header);