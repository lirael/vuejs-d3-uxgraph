<template>
  <div class="svg-line-container" id="bCanvas"></div>
</template>

<script>
import * as d3 from 'd3'
import $ from 'jquery'

export default {
  name: 'barcharts',
  props: {
    labelOne: {
      default : 'Fail'
    },
    colorOne: {
      default: '#4682b4'
    },
    labelTwo: {
      default : 'Success'
    },
    colorTwo: {
      default: '#9902b4'
    },
    data: {
      default: function () { 
        return [
          { "period": "West", "fail": 23, "success": 57 },
          { "period": "East", "fail": 23, "success": 78 },
          { "period": "North", "fail": 64, "success": 96 },
          { "period": "South", "fail": 21, "success": 54 }
        ]
      }
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.createLine('#bCanvas', this.data, this.labelOne, this.colorOne, this.labelTwo, this.colorTwo)
  },
  methods: {
    createLine(id, csv, labelOne, colorOne, labelTwo, colorTwo) {
      var canvasWidth = 500
      var canvasHeight = 300
      var margins = {top: 0, bottom: 30, left: 25, rigth: 0}

      var width = canvasWidth - margins.left - margins.rigth
      var height = canvasHeight - margins.top - margins.bottom

      // var width = barHeight * (csv.length - 1)

      var canvas = d3.select(id).append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 500 300")
        .classed("svg-content", true)
        .append("svg:g")

      var x = d3.scaleBand()
        .domain(d3.entries(csv).map(function (d) {return d.value.period}))
        .rangeRound([0, width]).padding(0.2)

      var y = d3.scaleLinear()
        // .domain([0, d3.max(csv, function (d) {return d.dollars})])
        .domain([0, 100])
        .range([height, 0])
   
      // Define the axes
      var xAx = d3.axisBottom(x).tickSize(0)
      var yAx = d3.axisLeft(y)

      canvas
        .append('g')
        .attr('class', 'spark-y axis')
        .attr("transform", "translate(" + margins.left + ",0)")
        .call(yAx)

      canvas
        .append('g')
        .attr('class', 'spark-x axis')
        .attr("transform", "translate(" + margins.left + "," + height + ")")
        .call(xAx)

      canvas.selectAll(".success").data(d3.entries(csv))
        .enter()
        .append("rect")
        .attr("transform", "translate(" + margins.left + ",0)")
        .attr('class', 'success')
        .attr("x", function (d) { return x(d.value.period) })
        .attr("width", x.bandwidth()/2)
        .attr("y", function (d) { return y(d.value.success) })
        .attr("height", function (d) { return height - y(d.value.success) })
        .style( "fill", colorOne )

      var bar = canvas.selectAll(".fail").data(d3.entries(csv))
        .enter()
        .append("rect")
        .attr("transform", "translate(" + margins.left + ",0)")
        .attr("class", "fail")
        .attr("x", function(d) { return x(d.value.period) + x.bandwidth()/2 })
        .attr("width", x.bandwidth()/2)
        .attr("y", function(d) { return y(d.value.fail); })
        .attr("height", function(d) { return height - y(d.value.fail); })
        .style( "fill", colorTwo )

      canvas
        .append("rect")
        .attr("y", y(d3.max(csv)))
        .attr("x", width / 2 - 50)
        .attr("transform", "translate(0,-8)")
        .attr("width", 8)
        .attr("height", 8)
        .style( "fill", colorOne )
      canvas
        .append("text")
        .attr("class", "spark-text")
        .attr("y", y(d3.max(csv)))
        .attr("x", width / 2 - 40)
        .text(labelOne)
        .attr("fill", "black")

      canvas
        .append("rect")
        .attr("y", y(d3.max(csv)))
        .attr("x", width / 2 + 50)
        .attr("transform", "translate(0,-8)")
        .attr("width", 8)
        .attr("height", 8)
        .style( "fill", colorTwo )
      canvas
        .append("text")
        .attr("class", "spark-text")
        .attr("y", y(d3.max(csv)))
        .attr("x", width / 2 + 60)
        .text(labelTwo)
        .attr("fill", "black")
    }
  },
  watch: {
    labelOne: {
      handler: function (val, oldVal) {
        d3.select('#bCanvas svg').remove()
        this.createLine('#bCanvas', this.data, val, this.colorOne, this.labelTwo, this.colorTwo)
      }
    },
    colorOne: {
      handler: function (val, oldVal) {
        d3.select('#bCanvas svg').remove()
        this.createLine('#bCanvas', this.data, this.labelOne, val, this.labelTwo, this.colorTwo)
      }
    },
    labelTwo: {
      handler: function (val, oldVal) {
        d3.select('#bCanvas svg').remove()
        this.createLine('#bCanvas', this.data, this.labelOne, this.colorOne, val, this.colorTwo)
      }
    },
    colorTwo: {
      handler: function (val, oldVal) {
        d3.select('#bCanvas svg').remove()
        this.createLine('#bCanvas', this.data, this.labelOne, this.colorOne, this.labelTwo, val)
      }
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
  fill: #999;
  stroke: #000;
}
.axis path,
.axis line {
    fill: none;
    stroke: grey;
    stroke-width: 1;
    shape-rendering: crispEdges;
}
</style>
