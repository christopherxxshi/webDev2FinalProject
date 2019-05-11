import React from "react";
import "../style/NoContent.css";
import image from "../images/noContent.png";

export function NoContent(props) {

    return (

        <div className="NoContent text-center">
               <br/> 
            <img className="imgExtn" alt="empty" src={image}></img>
            <h1>
                There are no Questions   
            </h1>    
        </div>

    )


}


export default NoContent;