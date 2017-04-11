import Vue from 'vue/dist/vue.js'
import * as d3 from 'd3'
import $ from 'jquery'

export default Vue.extend({
  render: function (create) {
    return create(
      'div', {
        attrs: {
          id:"lCanvas",
          class:"svg-container"
        }
      }
    )
  },
  name: 'sparklines',
  props: {
    label: {
      default : 'Bookings'
    },
    color: {
      default: '#4682b4'
    },
    data: {
      default: function () { 
        return [3, 6, 5, 3, 6, 5, 7, 5, 2, 1, 3, 4, 6, 9, 7, 9]}
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.createLine('#lCanvas', this.data, this.label, this.color)
  },
  watch: {
    label: {
      handler: function (val, oldVal) {
        d3.select('#lCanvas svg').remove()
        this.createLine('#lCanvas', this.data, val, this.color)
      }
    },
    color: {
      handler: function (val, oldVal) {
        d3.select('#lCanvas svg').remove()
        this.createLine('#lCanvas', this.data, this.label, val)
      }
    },
    data: {
      handler: function (val, oldVal) {
        d3.select('#lCanvas svg').remove()
        this.createLine('#lCanvas', val, this.label, this.color)
      }
    }
  },
  methods: {
    newData(){
      this.data = d3.range(10).map(function() {
        return (Math.round(Math.random() * 10)) + 1
      });
    },
    createLine(id, data, label, color) {
      var canvasWidth = 500
      var canvasHeight = 400

      var margins = {top: 0, bottom: 30, left: 25, rigth: 0}

      var width = canvasWidth - margins.left - margins.rigth
      var height = canvasHeight - margins.top - margins.bottom

      var canvas = d3.select(id).append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 500 400")
        .classed("svg-content", true)
        .append("svg:g")

      var x = d3.scaleLinear().domain([0, data.length]).range([0, width])
      var y = d3.scaleLinear().domain([0, 10]).range([height, 0])

      // Define the axes
      var xAx = d3.axisBottom(x)
      var yAx = d3.axisLeft(y)

      var line = d3.line()
        .x(function (d, i) {
          return x(i)
        })
        .y(function (d) {
          return y(d)
        })

      canvas
        .append('g')
        .attr('class', 'spark-x axis')
        .attr("transform", "translate(" + margins.left + "," + height + ")")
        .call(xAx)
        .append("text")
        .attr("y", '3em')
        .attr("x", "30em")
        .text("Quantity");
      canvas
        .append('g')
        .attr('class', 'spark-y axis')
        .attr("transform", "translate(" + margins.left + ",0)")
        .call(yAx)
      canvas
        .append('path')
        .attr('class', 'spark')
        .attr("transform", "translate(" + margins.left + "," + 35 + ")")
        .attr("d", line(data))

      canvas.append("text")
        .attr("class", "spark-text")
        .attr("y", y(data[data.length-1] - 1))
        .attr("x", x(data.length))
        .text(label)
        .attr("fill", "black")
    }
  }
})