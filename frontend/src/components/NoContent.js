import React from "react";
import "../style/NoContent.css";
import image from "../images/noQuestions.png";

export function NoContent(props) {

    return (

        <div className="NoContent text-center">
               <br/> 
            <img className="imgExtn" alt="empty" src={image}></img>
            
        </div>

    )


}


export default NoContent;