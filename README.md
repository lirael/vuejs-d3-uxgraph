![](./src/assets/uxgraph.png =250x)

# vuejs-d3-uxgraph

> Vue wrapper for d3.js predesigned somponents

> *Please,note:* library is still in the development mode! 

[![npm version](https://badge.fury.io/js/ux-graph.svg)](https://badge.fury.io/js/ux-graph)
[![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/ux-graph)

## Live demo and code example

- Demo: https://lirael.github.io/vuejs-d3-uxgraph-demo/
- Code: https://github.com/lirael/vuejs-d3-uxgraph-demo/

## Principles used to design the graphs

All designs are based on recommendations of Stephen Few described in a book "Information Dashboard Design".

## How to use with npm 

[![NPM](https://nodei.co/npm/ux-graph.png?downloads=true&downloadRank=true)](https://nodei.co/npm/ux-graph/)

Firstly you need to create Vue wrapper component. Exaple of `SparklinesBase.vue`:

```javascript
<template>
  <div class="svg-container" id="sCanvas"></div>
</template>

<script>
import { Sparklines } from 'ux-graph'

  export default Sparklines.extend({
    mounted () {
      // Overwriting base render method with actual data
      this.createSparkline('#sCanvas', this.data, this.label, this.circle, this.color)
    }
  })
</script>
```
Then in other your components you can sumply use it as follows:

```javascript
import Sparklines from './SparklinesBase.vue'
export default {
  name: 'SparklinesContainer',
  components: {
    'sparklines': Sparklines
  }
  [...]
```

and call it anywhere in the template using:
```
<sparklines> </sparklines>
```

## Manual integration

If you want to integrate some component manualy, and not via `npm`, it is needed to import components with a needed graph (graph components are located in `src/components/`. Then you can use it as usual Vue instance, and pass custom parameters when needed. Though `npm` usage is strongly recommended.

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

![](./src/assets/bar.png =300x)

## Available graphs
More graphs would be added during the next stage

### Sparklines
![](./src/assets/sparklines.png=300x)

### Line chart
![](./src/assets/line.png =300x)

### Vertical Bar charts
![](./src/assets/bar.png =300x)

### Horizontal Bar charts
![](./src/assets/hbars.png =300x)

## License

This software is distributed under [MIT license](LICENSE).

