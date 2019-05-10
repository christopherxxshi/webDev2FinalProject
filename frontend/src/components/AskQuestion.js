import React from "react";
import question from "../images/question.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import {  Link } from "react-router-dom";


function AskQuestion(props){


return(

    <div className="container ">
          <div className="row">
            <div className="col-lg-2 text-center">
              <img src={question} alt="ask question" width="50%"></img>
            </div>

            <div className="col-lg-8">
              <h2>Have a Question ask here...?</h2>
              <Link to="/askQuestion">
                <button className="btn btn-primary">
                  Ask Here
                    <FontAwesomeIcon cursor="pointer"
                    icon={faArrowRight}
                    className="mr-1 ml-2" />
                </button>
              </Link>
            </div>
          </div>


        </div>

)

} 

export default AskQuestion;