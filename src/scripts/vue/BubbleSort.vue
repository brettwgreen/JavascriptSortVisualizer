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
    doTheBubble(i) {
      if (i + 1 <= this._endIndex - 1) {
        if (this.sortObjects[i].value > this.sortObjects[i + 1].value) {
          this.swap(i, i + 1);
          this._swapOccurred = true;
        }
      }
      this.sortObjects[i].inspecting = false;
      this.sortObjects[i].currentStart = false;
      if (i + 1 <= this._endIndex - 1) {
        this.sortObjects[i + 1].currentStart = true;
        this.sortObjects[i + 1].inspecting = true;
        setTimeout(this.doTheBubble, this.delay, i + 1);
      } else {
        this.completeBubbleSortLoop();
      }
    },
	  startBubbleSort() {
      this._swapOccurred = false;
      this._startingIndex = 0;
      this.sortObjects[this._startingIndex].inspecting = true;
      this.sortObjects[this._startingIndex].currentStart = true;
      setTimeout(this.doTheBubble, this.delay, this._startingIndex);
    },
	  completeBubbleSortLoop() {
			if (this._swapOccurred) {
				// bubble sort n-1 optimization
				// biggest guy's at the end
				// you don't need to look at him anymore
				this._endIndex--;
				this.startBubbleSort();
			}
		},
	  sort() {
      console.log("started bubblesort at " + new Date());
      this._endIndex = this.sortObjects.length;
      this.startBubbleSort();
  	}
  },
  mounted: function(){
    this.init();
  }
}
</script>
<template>
  <div id="bubbleSort" class="sortGroup">
    <div class="data">
      <span v-for="item in sortObjects" v-bind:key="item.value">
        <div class="unit" v-bind:class="{inspecting: item.inspecting}" v-bind:style="{width: (item.value+10) + 'px'}"></div>
        <div v-show="item.currentStart" class="indicator"></div>
        <div class="clear"></div>
      </span>
    </div>
    <div class="sortInfo">
      <fieldset>
        <legend>Bubble Sort</legend>
        <label>Average:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
        <label>Worst:</label><div class="sortData">O(<i>n</i><sup>2</sup>)</div>
        <label>Best:</label><div class="sortData">O(<i>n</i>)</div>
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
