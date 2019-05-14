//Module for data graph using D3JS.

import React, { Component } from "react";
import { ReactDOM } from "react-dom";
import { withFauxDOM } from 'react-faux-dom'
import * as d3 from 'd3'
import dataQ from "../api";
import '../style/Graph.css'


let num = 0;
let colors = d3.schemeCategory10;

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

    async drawD3Chart() {
        
        const response = await dataQ.get("/api/question");
        this.setState({ searchData: response.data });

        let languageCategory = {};


        let countjava = 0;
        let counthtml = 0;
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
                } else {
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
        // console.log("language CAtegor", langArr)

        const div = this.props.connectFauxDOM('div', 'chart');
        let wid = 500;
        let het = 600;


        let margin = { top: 20, right: 30, bottom: 30, left: 35 },
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


        // For X-axis
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
            .attr("width", 70)
            .attr("y", (d) => y(d.frequency))
            .attr("height", (d) => { return height - y(d.frequency) })
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


export default withFauxDOM(Graph)
