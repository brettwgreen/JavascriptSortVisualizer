<script>
module.exports = {
  props: {
    values: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      sortObjects: [],
      delay: 10,
      averageHits: 0,
      swapCount: 0,
      partitionCount: 0,
      _endIndex: 0,
      _swapOccurred: false
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
          currentPivot: false,
          currentStart: 0,
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
      var tempValue = this.sortObjects[targetIndex].value;
      var tempInspecting = this.sortObjects[targetIndex].inspecting;
      var tempCurrentStart = this.sortObjects[targetIndex].currentStart;
      this.sortObjects[targetIndex].value = this.sortObjects[sourceIndex].value;
      this.sortObjects[targetIndex].inspecting = this.sortObjects[sourceIndex].inspecting;
      this.sortObjects[targetIndex].currentStart = this.sortObjects[sourceIndex].currentStart;
      this.sortObjects[sourceIndex].value = tempValue;
      this.sortObjects[sourceIndex].inspecting = tempInspecting;
      this.sortObjects[sourceIndex].currentStart = tempCurrentStart;
    },
	  partition(pivotValue,	startIndex, endIndex, currentIndex,	left, right) {
      if (currentIndex - 1 >= startIndex) {
        this.sortObjects[currentIndex - 1].inspecting = false;
      }
      if (currentIndex > endIndex) {
        this.completePartition(pivotValue, startIndex, endIndex, left, right);
      } else {
        this.sortObjects[currentIndex].inspecting = true;
        var value = this.sortObjects[currentIndex].value;
        if (value > pivotValue) {
          right.push(value);
        } else {
          left.push(value);
        }
        setTimeout(this.partition, this.delay, pivotValue, startIndex, endIndex, currentIndex + 1, left, right);
      }
    },
	  completePartition(pivotValue, startIndex, endIndex, left, right) {
      this.partitionCount++;
      var newArray = [];
      for (var i = 0; i < left.length; i++) {
        newArray.push(left[i]);
      }
      newArray.push(pivotValue);
      for (var i = 0; i < right.length; i++) {
        newArray.push(right[i]);
      }
      var x = 0;
      for (var i = startIndex; i <=
        endIndex + 1; i++) {
        this.sortObjects[i].value = newArray[x];
        this.sortObjects[i].currentPivot = false;
        x++;
      }
      var arr = [];
      for (var j = 0; j < this.sortObjects.length; j++) {
        arr.push(this.sortObjects[j].value);
      }
      // do left side
      if (left.length > 0) {
        var lStartIndex = startIndex;
        var lEndIndex = startIndex + left.length -
          2;
        var lPivotValue = left[left.length -
          1];
        this.sortObjects[lEndIndex + 1].currentPivot = true;
        //console.log("partioning left side from " + lStartIndex + " to " + lEndIndex + ", pivot=" + lPivotValue);
        setTimeout(this.partition, this.delay, lPivotValue, lStartIndex, lEndIndex, lStartIndex, [], []);
      }
      // do right side
      if (right.length > 0) {
        var rStartIndex = endIndex - right.length + 2;
        var rEndIndex = endIndex;
        var rPivotValue = right[right.length - 1];
        this.sortObjects[endIndex + 1].currentPivot = true;
        //console.log("partioning right side from " + rStartIndex + " to " + rEndIndex + ", pivot=" + rPivotValue);
        setTimeout(this.partition, this.delay, rPivotValue, rStartIndex, rEndIndex, rStartIndex, [], []);
      }
    },
	  startQuickSort() {
      var startIndex = 0;
      this.partitionCount = 0;
      var endIndex = this.sortObjects.length - 1;
      var pivotValue = this.sortObjects[endIndex].value;
      this.sortObjects[endIndex].currentPivot = true;
      setTimeout(this.partition, this.delay, pivotValue, startIndex, endIndex - 1, startIndex, [], []);
    },
	  sort() {
      console.log("started quicksort at " + new Date());
      this.startQuickSort();
    }
  },
  mounted: function(){
    this.init();
  }
}
</script>
<template>
  <div id="quickSort" class="sortGroup">
    <div class="data">
      <span v-for="item in sortObjects" v-bind:key="item.value">
        <div class="unit" v-bind:class="{inspecting: item.inspecting}" v-bind:style="{width: (item.value+10) + 'px'}"></div>
        <div v-show="item.currentStart" class="indicator"></div>
        <div class="clear"></div>
      </span>
    </div>
    <div class="sortInfo">
      <fieldset>
        <legend>Quick Sort</legend>
        <label>Average:</label><div class="sortData">O(<i>n</i> log <i>n</i>)</div>
        <label>Worst:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
        <label>Best:</label><div class="sortData">O(<i>n</i> log <i>n</i>)</div>
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
