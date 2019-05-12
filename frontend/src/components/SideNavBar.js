import React, { Component } from "react";

class SideNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: true
        }
    }

    openFunction = (e) => {
        e.preventDefault();
        document.getElementById("menu").style.width = "200px";
        document.getElementById("mainbox").style.marginLeft="200px";
        this.setState({data: true});
    }

    closeFunction = (e) => {
        e.preventDefault()
        document.getElementById("menu").style.width = "0px";
        document.getElementById("mainbox").style.marginLeft="0px";

    }

    render() {
        return (
            <div>
                <div id="mainbox" onClick={this.openFunction}>&#9776; Open</div>
                <div id="menu" className="sidemenu">
            
                    <a href="#">&#127968;</a>
                    <a href="#">Java</a>
                    <a href="#">JavaScript</a>
                    <a href="#">HTML</a>
                    <a href="#">Python</a>
                    <a href="#">Others</a>
                    <a href="#" className="closebutton" onClick={this.closeFunction}>&times;</a>

                </div>
            </div>


        )
    }



}

export default SideNavBar;