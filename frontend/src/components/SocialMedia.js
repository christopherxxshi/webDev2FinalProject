import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faGooglePlusSquare, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import "../style/socialMedia.css";
import auth from "../config/auth";
import firebase from "firebase";
import { connect } from "react-redux";
import { signIn } from "../action/index";


class SocialMedia extends React.Component {

    signInFacebook = async (sMedia) => {

        console.log(sMedia);

        var provider;
        if (sMedia == "google") {
            provider = new firebase.auth.GoogleAuthProvider();
        }
        else if (sMedia == "facebook") {
            provider = new firebase.auth.FacebookAuthProvider();
        }
        else if (sMedia == "github") {
            provider = new firebase.auth.GithubAuthProvider();
        }

        var userDetails = {
            name: "",
            email: "",
            emailVerified: "",
            imgUrl: ""
        };

        
        await auth.auth().signInWithPopup(provider).then( async (result)=> {
            var token = result.credential.accessToken;
            
            var user = result.user;

            console.log(result);

            userDetails["name"] = result.user.displayName;
            userDetails["email"] = result.user.email;
            userDetails["imgUrl"] = result.user.photoURL;
            userDetails["userId"] = result.user.uid;

       
            await this.props.signIn(userDetails);

    
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
            
            console.log(error);

            // this.alreadyExist(error);
          });
          


        



    }

    /*
    alreadyExist=(error)=>{
        // Step 1.
        // User tries to sign in to Google.
        // auth.signInWithPopup(provider).catch(function (error) {
            // An error happened.
            if (error.code === 'auth/account-exists-with-different-credential') {
                // Step 2.
                // User's email already exists.
                // The pending Google credential.
                var pendingCred = error.credential;
                // The provider account's email address.
                var email = error.email;
                // Get sign-in methods for this email.
                auth.fetchSignInMethodsForEmail(email).then(function (methods) {
                    // Step 3.
                    // If the user has several sign-in methods,
                    // the first method in the list will be the "recommended" method to use.
                    if (methods[0] === 'password') {
                        // Asks the user their password.
                        // In real scenario, you should handle this asynchronously.
                        // var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
                        auth.signInWithEmailAndPassword(email, password).then(function (user) {
                            // Step 4a.
                            return user.linkWithCredential(pendingCred);
                        }).then(function () {
                            // Google account successfully linked to the existing Firebase user.
                            // goToApp();
                        });
                        return;
                    }
                    // All the other cases are external providers.
                    // Construct provider object for that provider.
                    // TODO: implement getProviderForProviderId.
                    var provider = getProviderForProviderId(methods[0]);
                    // At this point, you should let the user know that he already has an account
                    // but with a different provider, and let him validate the fact he wants to
                    // sign in with this provider.
                    // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
                    // so in real scenario you should ask the user to click on a "continue" button
                    // that will trigger the signInWithPopup.
                    auth.signInWithPopup(provider).then(function (result) {
                        // Remember that the user may have signed in with an account that has a different email
                        // address than the first one. This can happen as Firebase doesn't control the provider's
                        // sign in flow and the user is free to login using whichever account he owns.
                        // Step 4b.
                        // Link to Google credential.
                        // As we have access to the pending credential, we can directly call the link method.
                        result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
                            // Google account successfully linked to the existing Firebase user.
                            // goToApp();
                        });
                    });
                });
            }
        // });
    }

*/

    render() {
        const divStyle = {
            display: "inline-block "
        }

        return (
            <div className="float-right" style={divStyle}>
                {/* <div>or Sign-in with...</div> */}
                <div>
                    <FontAwesomeIcon cursor="pointer" onClick={() => this.signInFacebook.bind(this)("facebook")}
                        icon={faFacebookSquare} size="2x"
                        className="mr-5 fbBrand" />

                    <FontAwesomeIcon cursor="pointer" onClick={() => this.signInFacebook.bind(this)("google")}
                        icon={faGooglePlusSquare} size="2x"
                        className="mr-5 gBrand" />

                    <FontAwesomeIcon cursor="pointer" onClick={() => this.signInFacebook.bind(this)("github")}
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