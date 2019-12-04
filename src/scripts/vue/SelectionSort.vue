<script>
module.exports = {
  props: {
    randomNumsFunction: null
  },
  data () {
    return {
      data: [],
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
      for (var i=0; i<this.data.length; i++){
        total += this.data[i].hitCount;
      }
      return total;
    }
  },
  methods: {
    setData(nums) {
      var numData = [];
      for (var i=0; i<nums.length; i++) {
        numData.push({
          value: nums[i],
          inspecting: false,
          currentStart: false,
	        hitCount: 0
        });
      };
      this.data = numData;
      this.averageHits = Math.pow(nums.length,2);
    },
    init(initData) {
      var data = this.randomNumsFunction();
      this.setData(data);
    },
    swap(targetIndex, sourceIndex) {
      if (targetIndex !== sourceIndex) {
        this.swapCount++;
        var tempValue = this.data[targetIndex].value;
        this.data[targetIndex].value = this.data[sourceIndex].value;
        this.data[sourceIndex].value = tempValue;
      }
    },
    checkSmallest(i) {
      if (this.data[i].value < this._smallest) {
        this._smallest = this.data[i].value;
        this._smallestIndex = i;
      }
      this.data[i].inspecting = false;
      if (i + 1 <= this.data.length - 1) {
        this.data[i + 1].inspecting = true;
        setTimeout(this.checkSmallest, this.delay, i + 1);
      } else {
        this.completeSelectionSortFrom();
      }
    },
    startSelectionSortFrom(i) {
      if (i > this.data.length - 1) {
        return;
      }
      this._smallestIndex = i;
      this._startingIndex = i;
      this._smallest = this.data[this._smallestIndex].value;
      this.data[this._startingIndex].inspecting = true;
      this.data[this._startingIndex].currentStart = true;
      setTimeout(this.checkSmallest, this.delay, this._startingIndex);
    },
    completeSelectionSortFrom() {
      this.swap(this._startingIndex, this._smallestIndex);
      this.data[this._startingIndex].currentStart = false;
      this.startSelectionSortFrom(this._startingIndex + 1);
    },
    sort() {
      console.log("started selectionsort at " + new Date());
      // reset hit counts
      this.swapCount = 0;
      for (var k=0; k<this.data.length; k++){
        this.data[k].hitCount = 0;
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
      <span v-for="item in data" v-bind:key="item.value">
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
