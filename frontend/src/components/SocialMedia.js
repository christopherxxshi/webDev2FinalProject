import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faGooglePlusSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
// import "../style/SocialMedia.css";
import auth from "../config/auth";
import firebase from "firebase";
import { connect } from "react-redux";
import { signIn } from "../action/index";


class SocialMedia extends React.Component {

    signInFacebook= async (sMedia)=>{

        console.log(sMedia);

        var provider;
        if(sMedia == "google"){
            provider =  new firebase.auth.GoogleAuthProvider();
        }
        else if(sMedia == "facebook"){
            provider = new firebase.auth.FacebookAuthProvider();
        }
        else if(sMedia == "github"){
            new firebase.auth.GithubAuthProvider();
        }

        var userDetails = {
            name : "",
            email:"",
            emailVerified : "",
            imgUrl : ""
        };

        await auth.auth().signInWithPopup(provider).then( async (result)=> {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // console.log(token);
            // The signed-in user info.
            var user = result.user;

            console.log(user);

            userDetails["name"] = result.user.displayName;
            userDetails["email"] = result.user.email;
            // userDetails["emailVerified"] = result.user.emailVerified;
            userDetails["imgUrl"] = result.user.photoURL;

            // console.log(user.displayName);

            await this.props.signIn(userDetails);

            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

        //   console.log(this.props);

        //    this.props.signIn();

    }
    


    render() {
        const divStyle = {
            display: "inline-block "
        }

        return (
            <div className="float-right" style={divStyle}>
                {/* <div>or Sign-in with...</div> */}
                <div>
                    <FontAwesomeIcon cursor="pointer" onClick={()=>this.signInFacebook.bind(this)("facebook")} 
                                                      icon={faFacebookSquare} size="2x" 
                                                      className="mr-5 fbBrand" />

                    <FontAwesomeIcon cursor="pointer" onClick={()=>this.signInFacebook.bind(this)("google")}
                                                      icon={faGooglePlusSquare} size="2x" 
                                                      className="mr-5 gBrand" />

                    <FontAwesomeIcon cursor="pointer" onClick={()=>this.signInFacebook.bind(this)("github")}
                                                      icon={faGithubSquare} 
                                                      className="ghBrand"
                                                      size="2x" />
                </div>


            </div>
        )
    }

}


// export default SocialMedia;

// const mapStateToProps = (state) => {


//     return {message:"message"};
// };

export default connect(null, { signIn })(SocialMedia);