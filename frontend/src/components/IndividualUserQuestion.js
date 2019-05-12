import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserQuestions } from "../action";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { Link } from "react-router-dom";
import NoContent from "./NoContent";

class IndividualUserQuestion extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showComments: null
        };
    }

    async componentDidMount() {

        await this.props.getUserQuestions(this.props.auth.userId);

    }

    openComments = (e) => {
        // e.preventDefault();
        this.setState({ showComments: e });


    }

    render() {

        var userquestions = this.props.questions;
        // console.log("render")
        // console.log(userquestions);

        var questions = [];

        if (this.props.questions !== undefined) {

            for (let prop in userquestions) {
                let indiQuestion = userquestions[prop];
                if(indiQuestion !=null){
                questions.push(

                    // <div className="centerAlign">
                    <div >
                        {/* <div className="userBody"> */}
                        <div key={indiQuestion.quesId}>
                            <div className="box" onClick={() => this.openComments.bind(this)(indiQuestion.quesId)}>
                                {/* <div  onClick={() => this.openComments.bind(this)(indiQuestion.quesId)}> */}
                                {/* <div className="content"> */}
                                <div className="text-center">
                                    <h2>{indiQuestion.title}</h2>
                                    <p>
                                        {indiQuestion.description}

                                    </p>
                                </div>
                                {/* <div className="float-right"> */}
                                <div className="row text-center">
                                    <div className="userDateTime  col-lg-5">
                                        <div >
                                            On <FontAwesomeIcon className="" icon={faCalendarAlt} /> | {indiQuestion.date}

                                        </div>
                                        <div>
                                            At <FontAwesomeIcon className="" icon={faClock} /> | {indiQuestion.time} {indiQuestion.time > 12 ? <span>AM</span> : <span>PM</span>}

                                        </div>

                                    </div>

                                    {indiQuestion.answers === 0 ?

                                        (
                                    <div className="col-lg-5 btnEditDelete" >
                                        <div>
                                            <Link to={`/editUserQues/${indiQuestion.quesId}`}><button className="btn btn-primary">Edit</button></Link>
                                        </div>
                                        <div>
                                            <Link to={`/deleteUserQues/${indiQuestion.quesId}`}><button className="btn btn-primary">Delete</button></Link>
                                        </div>
                                    </div>
                                     )
                                        : null

                                    } 


                                </div>



                            </div>

                            <br />

                            {/* {( this.state.showComments) ? */}
                            {(this.state.showComments === indiQuestion.quesId) ?
                                <div className="box1">
                                    <p>Comments</p>
                                    <div className="clsUsername">
                                        <div className="spacer"></div>
                                        <p>-Username</p>
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    </div>

                );
                        }
            }


        }
        else{
            questions = (<div>

                <NoContent></NoContent>

            </div>)

        }


        return (
            // <div className="centerAlign">
            //     <div className="userBody">
            //         <div className="box" onClick={this.openComments}>
            //             <div className="content">
            //                 <h2>Title</h2>
            //                 <p>
            //                     Description

            //             </p>
            //             </div>
            //         </div><br />

            //         {(this.state && this.state.showComments) ?
            //             <div className="box1">
            //                 <p>Comments</p>
            //                 <div className="clsUsername">
            //                     <div className="spacer"></div>
            //                     <p>-Username</p>
            //                 </div>
            //             </div>
            //             :
            //             null
            //         }
            //     </div>
            // </div>

            <div>
                <hr />
                <div className="text-center">
                    <h1>
                        Here are your all the questions which you posted
                </h1>
                    <h3>
                        Note : You can only edit and delete your Questio when there are zero answers.
                </h3>
                </div>

                <div className="container">
                    <hr />
                    {questions}
                </div>

            </div>



        )
    }
}


const mapStsteToProps = (state) => {

    console.log("individual question");
    var arr = [];
    for (let prop in state.questions.question) {
        arr.push(state.questions.question[prop]);
    }

    return {
        auth: state.auth,
        questions: arr
    };
}

// export default IndividualUserQuestion;

export default connect(mapStsteToProps, { getUserQuestions })(IndividualUserQuestion);