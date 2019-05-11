import React, { Component } from 'react';
import * as d3 from "d3";

class BarChart extends Component {

    componentDidMount() {
        this.drawChart();
    }

    drawChart() {

        // const data = [12, 5, 6, 6, 9, 10];

        // const svg = d3.select("body").append("svg").attr("width", 700).attr("height", 300);

        const svg = d3.select("body").append("svg")
            .attr("width", this.props.width)
            .attr("height", this.props.height);

        svg.selectAll("rect")
            .data(this.props.data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 80)
            .attr("y", (d, h) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 50)
            .attr("fill", "green")


        // svg.selectAll("text")
        //     .data(this.props.data)
        //     .enter()
        //     .append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i * 80)
        //     .attr("y", (d, h) => h - (20 * d) - 3)

    }

    render() {
        return <div id="#bar"></div>
    }



}

export default BarChart;