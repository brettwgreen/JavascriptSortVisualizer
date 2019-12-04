<script>
module.exports = {
  props: {
    values: []
  },
  data () {
    return {
      sortObjects: [],
      delay: 10,
      averageHits: 0,
      swapCount: 0,
      _smallest: 0,
      _smallestIndex: 0
    }
  },
  computed: {
    actualHits() {
      var total = 0;
      for (var i=0; i<this.values.length; i++){
        total += this.values[i].hitCount;
      }
      return total;
    }
  },
  watch: {
    values (newValues) {
      this.setData(newValues);
    }
  },
  methods: {
    setData(values) {
      var sObjects = [];
      for (var i=0; i<this.values.length; i++) {
        sObjects.push({
          value: this.values[i],
          inspecting: false,
          currentStart: false,
	        hitCount: 0
        });
      };
      this.sortObjects = sObjects;
      this.averageHits = Math.pow(this.values.length,2);
    },
    init() {
      this.setData(this.values);
    },
    swap(targetIndex, sourceIndex) {
      if (targetIndex !== sourceIndex) {
        this.swapCount++;
        var tempValue = this.sortObjects[targetIndex].value;
        this.sortObjects[targetIndex].value = this.sortObjects[sourceIndex].value;
        this.sortObjects[sourceIndex].value = tempValue;
      }
    },
    checkSmallest(i) {
      if (this.sortObjects[i].value < this._smallest) {
        this._smallest = this.sortObjects[i].value;
        this._smallestIndex = i;
      }
      this.sortObjects[i].inspecting = false;
      if (i + 1 <= this.sortObjects.length - 1) {
        this.sortObjects[i + 1].inspecting = true;
        setTimeout(this.checkSmallest, this.delay, i + 1);
      } else {
        this.completeSelectionSortFrom();
      }
    },
    startSelectionSortFrom(i) {
      if (i > this.sortObjects.length - 1) {
        return;
      }
      this._smallestIndex = i;
      this._startingIndex = i;
      this._smallest = this.sortObjects[this._smallestIndex].value;
      this.sortObjects[this._startingIndex].inspecting = true;
      this.sortObjects[this._startingIndex].currentStart = true;
      setTimeout(this.checkSmallest, this.delay, this._startingIndex);
    },
    completeSelectionSortFrom() {
      this.swap(this._startingIndex, this._smallestIndex);
      this.sortObjects[this._startingIndex].currentStart = false;
      this.startSelectionSortFrom(this._startingIndex + 1);
    },
    sort() {
      console.log("started selectionsort at " + new Date());
      // reset hit counts
      this.swapCount = 0;
      for (var k=0; k<this.sortObjects.length; k++){
        this.sortObjects[k].hitCount = 0;
      }
      this.startSelectionSortFrom(0);
    }
  },
  mounted: function(){
    this.init();
  }
}
</script>
<template>
  <div id="selectionSort" class="sortGroup" data-bind="with: selectionSort">
    <div class="data">
      <span v-for="item in sortObjects" v-bind:key="item.value">
        <div class="unit" v-bind:class="{inspecting: item.inspecting}" v-bind:style="{width: (item.value+10) + 'px'}"></div>
        <div v-show="item.currentStart" class="indicator"></div>
        <div class="clear"></div>
      </span>
    </div>
    <div class="sortInfo">
      <fieldset>
        <legend>Selection Sort</legend>
        <label>Average:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
        <label>Worst:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
        <label>Best:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
      </fieldset>
    </div>
    <div class="sortPanel">
      <br clear="all" /><br />
      <label for="delay">delay</label>: <input id="delay" type="text" v-model="delay"><br /><br />
      <button v-on:click="sort">sort</button><br /><br />
      <button v-on:click="init">scramble</button>
    </div>
  </div>
</template>
