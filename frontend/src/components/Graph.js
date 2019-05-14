import React, { Component } from "react";
import { ReactDOM } from "react-dom";
//import MyTool from "my-tooltip-component";
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3'
import dataQ from "../api";
//import { connect } from "react-redux";
import '../style/Graph.css'

var num = 0;
var colors = d3.schemeCategory10;

class Graph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chart: 'LOADING ',
            language: 'Recent Asked Questions',
            searchData: undefined

        }
    }

    componentDidMount() {

        this.drawD3Chart();
    }

    // shouldComponentUpdate() {
    //     return false;
    // }

    async drawD3Chart() {
        // await this.props.displayQuestions();


        const response = await dataQ.get("/api/question");
        console.log("response for graph", response);
        this.setState({ searchData: response.data });

        let languageCategory = {};


        let countjava = 0;
        let counthtml = 0;
        // let countc = 0;
        let countpy = 0;
        let countjs = 0;
        let countts = 0;
        let countothers = 0;
        var allQuestions = [];
        let langArr = [];

        allQuestions = this.state.searchData.map(question => {

            if (question) {
                if (question.language == "Java") {
                    languageCategory["Java"] = countjava++;
                } else if (question.language == "HTML") {
                    languageCategory["HTML"] = counthtml++;
                } else if (question.language == "JavaScript") {
                    languageCategory["JavaScript"] = countjs++;
                } else if (question.language == "Python") {
                    languageCategory["Python"] = countpy++;
                } else if (question.language == "TypeScript") {
                    languageCategory["TypeScript"] = countts++;
                }
                else {
                    languageCategory["Others"] = countothers++;
                }
            }
            return languageCategory;
        })
        langArr.push({
            letter: "Java",
            frequency: countjava
        })
        langArr.push({
            letter: "HTML",
            frequency: counthtml
        })
        langArr.push({
            letter: "JavaScript",
            frequency: countjs
        })

        langArr.push({
            letter: "Python",
            frequency: countpy
        })
        langArr.push({
            letter: "TypeScript",
            frequency: countts
        })
        langArr.push({
            letter: "Others",
            frequency: countothers
        })
        console.log("language CAtegor", langArr)

        const div = this.props.connectFauxDOM('div', 'chart');
        let wid = 500;
        let het = 600;

        // let data = [
        //     { letter: "A", frequency: .08167 },
        //     { letter: "B", frequency: .01492 },
        //     { letter: "C", frequency: .02780 },
        //     { letter: "D", frequency: .04253 },
        //     { letter: "E", frequency: .12702 },
        //     { letter: "F", frequency: .02288 },
        //     { letter: "G", frequency: .02022 },
        //     { letter: "H", frequency: .06094 },
        //     { letter: "I", frequency: .06973 },
        //     { letter: "J", frequency: .00153 },
        //     { letter: "K", frequency: .00747 },
        //     { letter: "L", frequency: .04025 },
        //     { letter: "M", frequency: .02517 },
        //     { letter: "N", frequency: .06749 },
        //     { letter: "O", frequency: .07507 },
        //     { letter: "P", frequency: .01929 },
        //     { letter: "Q", frequency: .00098 },
        //     { letter: "R", frequency: .05987 },
        //     { letter: "S", frequency: .06333 },
        //     { letter: "T", frequency: .09056 },
        //     { letter: "U", frequency: .02758 },
        //     { letter: "V", frequency: .01037 },
        //     { letter: "W", frequency: .02465 },
        //     { letter: "X", frequency: .00150 },
        //     { letter: "Y", frequency: .01971 },
        //     { letter: "Z", frequency: .00074 },
        // ]

        //let data = this.props.data
        let margin = { top: 20, right: 30, bottom: 30, left: 35 },
            // width = this.props.width - margin.left - margin.right,
            // height = this.props.height - margin.top - margin.bottom;
            width = wid - margin.left - margin.right,
            height = het - margin.top - margin.bottom;

        let x = d3.scaleBand()
            .rangeRound([0, width])

        let y = d3.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, 100])

        let xAxis = d3.axisBottom()
            .scale(x)

        let yAxis = d3.axisLeft()
            .scale(y)
            .tickSize(10)



        //Pass it to d3.select and proceed as normal
        let svg = d3.select(div).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);


        x.domain(langArr.map((d) => d.letter));
        y.domain([0, d3.max(langArr, (d) => d.frequency)]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .text("Frequency");

        svg.selectAll(".bar")
            .data(langArr)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", (d) => x(d.letter))
            .attr("width", 60)
            .attr("y", (d) => y(d.frequency))
            .attr("height", (d) => { return height - y(d.frequency) })
            .style("margin", function(d) { return "20px"; })
            .attr("fill", function (d, i) {
                if(i>=6){
                    if (i.toString().includes("0")) {
                        num = i;
                    }
                    i = i - num;
                }
                return colors[i];
            })
            .append('title')
            .text((d) => {
                return d.letter +" ("+d.frequency+" Questions)"
            });
    }

    render() {
        return (
            <div>
                <h1>
                    <div className="graphCenter">
                        {this.props.chart}
                    </div>
                </h1>

            </div>

        );
    }
}


// const mapStateToProps = (state) => {

//     // console.log("display component");

//     // console.log(state.questions);

//     console.log("state.questions.question");

//     return { questions: state.questions.question, language: state.language.language };
// };
export default withFauxDOM(Graph)

// export default connect(mapStateToProps, { displayQuestions })(withFauxDOM(Graph));