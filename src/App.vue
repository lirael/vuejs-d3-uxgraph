<template>
  <div id="app">
    <div class="row">
      <sparklines></sparklines>
    </div>
    <div class="row">
      <linecharts></linecharts>
    </div>
    <div class="row">
      <barcharts></barcharts>
    </div>
  </div>
</template>

<script>
import Sparklines from './components/Sparklines.vue'
import Linecharts from './components/Linecharts.vue'
import Barcharts from './components/Barcharts.vue'

export default {
  name: 'ux-graph',
  components: {
    'sparklines': Sparklines,
    'linecharts': Linecharts,
    'barcharts': Barcharts
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 960px;
  margin: 0 auto;
}
</style>
