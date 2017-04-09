import Vue from 'vue/dist/vue.js'
import * as d3 from 'd3'
import $ from 'jquery'

export default Vue.extend({
  render: function (create) {
    return create(
      'div', {
        attrs: {
          id:"sCanvas",
          class:"svg-container"
        }
      }
    )
  },
  name: 'sparklines',
  props: {
    label: {
      default : 'Daily defects'
    },
    color: {
      default: '#4682b4'
    },
    circle: {
      default: true
    },
    data: {
      default: function () { 
        return [0, 2, 3, 5, 4, 10, 4, 11, 10, 15, 4, 11, 10, 9, 5, 11, 15, 9, 10, 11, 15] }
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.createSparkline('#sCanvas', this.data, this.label, this.circle, this.color)
  },
  watch: {
    label: {
      handler: function (val, oldVal) {
        d3.select('#sCanvas svg').remove()
        this.createSparkline('#sCanvas', this.data, val, this.circle, this.color)
      }
    },
    color: {
      handler: function (val, oldVal) {
        d3.select('#sCanvas svg').remove()
        this.createSparkline('#sCanvas', this.data, this.label, this.circle, val)
      }
    },
    circle: {
      handler: function (val, oldVal) {
        d3.select('#sCanvas svg').remove()
        this.createSparkline('#sCanvas', this.data, this.label, val, this.color)
      }
    },
    data: {
      handler: function (val, oldVal) {
        d3.select('#sCanvas svg').remove()
        this.createSparkline('#sCanvas', val, this.label, this.circle, this.color)
      }
    }
  },
  methods: {
    newData(){
      this.data = d3.range(10).map(function() {
        return (Math.round(Math.random() * 10)) + 1
      });
    },
    createSparkline(id, data, label, circle, color) {
      var canvasWidth = $('#sCanvas').parent().width()
      var canvasHeight = 40

      var margins = {top: -4, bottom: 0, left: 0, rigth: 50}

      var width = canvasWidth - margins.left - margins.rigth
      var height = canvasHeight - margins.top - margins.bottom

      var canvas = d3.select(id).append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "viewBox", "0 0 "+ width +" " + height +"")
        .classed("svg-content", true)

      var x = d3.scaleLinear().domain([0, data.length]).range([0, width])
      var y = d3.scaleLinear().domain([0, d3.max(data)]).range([height, 0])

      var line = d3.line()
        .x(function (d, i) {
          return x(i)
        })
        .y(function (d) {
          return y(d)
        })
        .curve(d3.curveBasis)

      canvas
        .append('path')
        .attr('class', 'spark-path')
        .attr("transform", "translate(" + margins.right + ", " + margins.top + ")")
        .attr('stroke', color)
        .attr('fill', none)
        .attr('d', line(data))

      if(circle){
        canvas
          .append('circle')
          .attr('class', 'sparkcircle')
          .attr('cx', x(data.length - 1))
          .attr('cy', y(data[data.length-1]))
          .attr('r', 2)
          .attr('fill', 'red')
      }

      canvas.append("text")
        .attr("class", "spark-text")
        .attr("y", y(d3.max(data) / 2 ))
        .attr("x", x(data.length))
        .text(data[data.length-1] + " " + label)
        .attr("fill", "black")
    }
  }
})
