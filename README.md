<div align="center">
  <img width="256" heigth="256" src="/src/assets/uxgraph.png" alt="uxgraph logo">
</div>

# vuejs-d3-uxgraph

> Vue wrapper for d3.js predesigned somponents

[![npm version](https://badge.fury.io/js/ux-graph.svg)](https://badge.fury.io/js/ux-graph)
[![npm](https://img.shields.io/npm/dm/localeval.svg)](https://www.npmjs.com/package/ux-graph)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ux-graph)
[![npm](https://img.shields.io/npm/dt/express.svg)](https://www.npmjs.com/package/ux-graph)

## Live demo and code example

- Demo: https://lirael.github.io/vuejs-d3-uxgraph-demo/
- Code: https://github.com/lirael/vuejs-d3-uxgraph-demo/

## Principles used to design the graphs

All designs are based on recommendations of Stephen Few described in a book "Information Dashboard Design".

## How to use

Since the pakage is not available in `npm` yet, at this stage it is needed to manualy import components with a needed graph. Then you can use it as usual Vue instance, and pass custom parameters when needed.

### To create a component

```javascript
import barcharts from './Barcharts.vue'
export default {
  name: 'barcharts',
  components: {
    'barcharts': barcharts
  }
[...]
```

And to use it in a template:
```javascript
<barcharts
    colorOne="#4682B4" 
    labelOne="Success" 
    colorTwo="#d3d3d3" 
    labelTwo="Fail">
</barcharts>
```

Result is as follows:

<div align="center">
  <img width="300" heigth="400" src="/src/assets/bar.png">
</div>

## Available graphs
More graphs would be added during the next stage

### Sparklines
<div align="center">
  <img width="300" heigth="400" src="/src/assets/sparklines.png">
</div>

### Line chart
<div align="center">
  <img width="300" heigth="400" src="/src/assets/line.png">
</div>

### Vertical Bar charts
<div align="center">
  <img width="300" heigth="400" src="/src/assets/bar.png">
</div>

### Horizontal Bar charts
<div align="center">
  <img width="300" heigth="400" src="/src/assets/hbars.png">
</div>

## License

This software is distributed under [MIT license](LICENSE).

