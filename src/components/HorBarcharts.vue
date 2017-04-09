<template>
  <div id="linecharts">
    <h2>{{ msg }}</h2>
    <div class="col-sm-6 col-sm-offset-3" style="">
      <div class="svg-line-container" id="hbCanvas">
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import $ from 'jquery'

export default {
  name: 'sparklines',
  data () {
    return {
      msg: 'Horizontal bar charts',
      data: [
        { "letter": "A", "frequency": 0.08167 },
        { "letter": "E", "frequency": 0.12702 },
        { "letter": "I", "frequency": 0.06966 },
        { "letter": "O", "frequency": 0.07507 },
        { "letter": "U", "frequency": 0.02758 },
      ]
    }
  },
  mounted () {
    this.createLine('#hbCanvas', this.data)
  },
  methods: {
    createLine(id, csv) {

      var canvasWidth = 500
      var canvasHeight = 200
      var margins = {top: 0, bottom: 0, left: 25, rigth: 0}

      var width = canvasWidth - margins.left - margins.rigth
      var height = canvasHeight - margins.top - margins.bottom

      var canvas = d3.select(id).append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 500 350")
        .classed("svg-content", true)

      var x = d3.scaleLinear()
        .domain([0, d3.max(csv, function(d) { return d.frequency; })])
        .rangeRound([0, width])

      var y = d3.scaleBand()
        .domain(d3.entries(csv).map(function (d) {return d.value.letter}))
        .rangeRound([height, 0]).padding(0.2)
   
      // Define the axes
      var yAx = d3.axisLeft(y).tickSize(0)

      canvas
        .append('g')
        .attr('class', 'spark-y axis axis-invisible')
        .attr("transform", "translate(" + margins.left + ",0)")
        .call(yAx)

      var bars = canvas.selectAll(".bar").data(d3.entries(csv))
        .enter()
        .append("g")
        .attr("transform", "translate(" + margins.left + ",0)")

      bars.append("rect")
        .attr('class', 'bar')
        .attr("y", function (d) { return y(d.value.letter); })
        .attr("x", 0)
        .attr("width", function (d) { return x(d.value.frequency) })
        .attr("height", y.bandwidth())
        .style( "fill", "steelblue" )

      bars.append("text")
        .attr("class", "label")
        .attr("y", function (d) {
          return y(d.value.letter) + y.bandwidth() / 2 + 4
        })
        .attr("x", function (d) {
          return x(d.value.frequency) - 40
        })
        .text(function (d) {
          return d.value.frequency * 100
        })
        .attr("fill", "white")
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.spark {
  stroke: steelblue;
  stroke-width: 1;
}

.svg-line-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: visible;
}
.svg-content {
    display: inline-block;
    position: absolute;
    overflow: visible !important;
    top: 0;
    left: 0;
}

.axis {
    shape-rendering: crispEdges;
}
.spark-x line {
  stroke: lightgrey;
}
.spark-x .minor {
  stroke-opacity: .5;
}
.spark-x path {
  display: block;
}
.spark-y line, .spark-y path {
  fill: red;
  stroke: red;
}

.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}
.label{
  font-weight: normal;
}

.axis-invisible path{
  fill: none !important;
  stroke: none !important;
}
</style>
