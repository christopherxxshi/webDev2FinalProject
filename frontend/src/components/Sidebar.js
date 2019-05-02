import React from "react";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava,faJsSquare,faPython,faCss3Alt,faHtml5 } from '@fortawesome/free-brands-svg-icons';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const SideBar = () => {

    // render(){
    return (
        <div >
            <SideNav
                onSelect={(selected) => {
                    // Add your code here
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="java">
                        <NavIcon>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            <FontAwesomeIcon className="" icon={faJava} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Java
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="js">
                        <NavIcon>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            <FontAwesomeIcon className="" icon={faJsSquare} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            JavaScript
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="html">
                        <NavIcon>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            <FontAwesomeIcon className="" icon={faCss3Alt} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            HTML5
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="python">
                        <NavIcon>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            <FontAwesomeIcon className="" icon={faPython} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Python
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="css">
                        <NavIcon>
                            {/* <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /> */}
                            <FontAwesomeIcon className="" icon={ faHtml5} style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            CSS3
                        </NavText>
                    </NavItem>
                    {/* <NavItem eventKey="charts">
                        <NavIcon>
                            <i className="fa fa-fw fa-line-chart" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Charts
            </NavText>
                        <NavItem eventKey="charts/linechart">
                            <NavText>
                                Line Chart
                </NavText>
                        </NavItem>
                        <NavItem eventKey="charts/barchart">
                            <NavText>
                                Bar Chart
                </NavText>
                        </NavItem>
                    </NavItem> */}
                </SideNav.Nav>
            </SideNav>
        </div>

    )
    // }

}

export default SideBar;