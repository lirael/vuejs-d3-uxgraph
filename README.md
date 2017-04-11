<div align="center">
   <img width="256" heigth="256" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/uxgraph.png?raw=true" alt="uxgraph logo">
</div>

# vuejs-d3-uxgraph

> Vue wrapper for d3.js predesigned somponents

> *Please,note:* library is still in the development mode!!!

## Live demo and code example

- Demo: https://lirael.github.io/vuejs-d3-uxgraph-demo/
- Code: https://github.com/lirael/vuejs-d3-uxgraph-demo/

## Principles used to design the graphs

All designs are based on recommendations of Stephen Few described in a book "Information Dashboard Design".

## How to use with npm 

[![NPM](https://nodei.co/npm/ux-graph.png?downloads=true&downloadRank=true)](https://nodei.co/npm/vuejs-d3-uxgraph/)

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

<div align="center">
   <img width="300" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/bar.png?raw=true" alt="uxgraph logo">
</div>

## Available graphs
More graphs would be added during the next stage

### Sparklines
<div align="center">
   <img width="300" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/sparklines.png?raw=true" alt="uxgraph logo">
</div>

### Line chart
<div align="center">
   <img width="300" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/line.png?raw=true" alt="uxgraph logo">
</div>

### Vertical Bar charts
<div align="center">
   <img width="300" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/bar.png?raw=true" alt="uxgraph logo">
</div>

### Horizontal Bar charts
<div align="center">
   <img width="300" src="https://github.com/lirael/vuejs-d3-uxgraph/blob/master/src/assets/hbars.png?raw=true" alt="uxgraph logo">
</div>

## Contributing

1. Fork it ( https://github.com/lirael/vuejs-d3-uxgraph/fork )
2. Create new branch for your feature (`git checkout -b new-feature`)
3. Commit your changes (`git commit -m 'Feature description'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

Thanks!

## License

This software is distributed under [MIT license](LICENSE).

