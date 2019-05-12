import React, { Component } from "react";
import { searchLanguageQuestions } from "../action";
import { connect } from "react-redux";

class SideNavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: true,
            language: null
        }
    }

    openFunction = (e) => {
        e.preventDefault();
        document.getElementById("menu").style.width = "200px";
        document.getElementById("mainbox").style.marginLeft = "200px";
        this.setState({ data: true });
    }

    closeFunction = (e) => {
        e.preventDefault()
        document.getElementById("menu").style.width = "0px";
        document.getElementById("mainbox").style.marginLeft = "0px";

    }

    onSearchLang = async (event) => {

        await this.props.searchLanguageQuestions(event);
    }

    render() {
        return (
            <div>
                <div id="mainbox" onClick={this.openFunction}>&#9776; Select Language</div>
                <div id="menu" className="sidemenu">
                    {/* <button className="btn" onClick={()=>this.onSearchLang.bind(this)("Java")}> Java</button> */}
                    <a href="#">&#127968;</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("Java")}>Java</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("JavaScript")}>JavaScript</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("HTML")}>HTML</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("Python")}>Python</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("Others")}>Others</a>
                    <a href="#" onClick={() => this.onSearchLang.bind(this)("TypeScript")}>TypeScript</a>
                    <a href="#" className="closebutton" onClick={this.closeFunction}>&times;</a>
                </div>
            </div>


        )
    }



}

export default connect(null, { searchLanguageQuestions })(SideNavBar);