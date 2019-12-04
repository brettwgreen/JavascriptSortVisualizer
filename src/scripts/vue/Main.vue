<script>
  const SelectionSort = require('./SelectionSort.vue')
  const BubbleSort = require('./BubbleSort.vue')
  const QuickSort = require('./QuickSort.vue')
  module.exports = {
    props: {
      numberOfElements: {
        type: Number,
        default() {
          return 50
        }
      }
    },
    data()  {
      return {
        currentData: []
      }
    },
    components: {
      SelectionSort,
      BubbleSort,
      QuickSort
    },
    mounted() {
      this.currentData = this.getRandomArray();
    },
    methods: {
      getRandomArray() {
        var count = 0;
        var nums = [];
        while (count < this.numberOfElements) {
          var num = Math.ceil(Math.random() * this.numberOfElements);
          if (!nums.includes(num)) {
            nums.push(num);
            count++;
          }
        }
        return nums;
      },
		  getDescendingArray() {
        var nums = [];
        var count = this.numberOfElements;
        while (count > 0) {
          nums.push(count-1);
          count--;
        }
        return nums;
      },
		  getAscendingArray() {
        var nums = [];
        var current = 0;
        while (current < this.numberOfElements) {
          nums.push(current);
          current++;
        }
        return nums;
		  },
		  getNearlySortedArray() {
        var nums = [];
        var current = 0;
        while (current < this.numberOfElements) {
          nums.push(current);
          current++
        }
        var swapTotal = 5;
        var swaps = 0;
        while (swaps < swapTotal) {
          var num1 = Math.ceil(Math.random() * (this.numberOfElements-1));
          var num2 = num1+1;
          if (num2 < this.numberOfElements) {
            var temp = nums[num2];
            nums[num2] = nums[num1];
            nums[num1] = temp;
            swaps++;
          }
        }
        return nums;
      },
		  startAll() {
        for (var i=0; i<this.$children.length; i++){
          if (this.$children[i].sort) {
            this.$children[i].sort();
          }
        }
      },
		  scrambleAll() {
        this.currentData = this.getRandomArray();
      },
		  setDescending() {
        this.currentData = this.getDescendingArray();
      },
		  setAscending() {
        this.currentData = this.getAscendingArray();
      },
		  setNearlySorted() {
        this.currentData = this.getNearlySortedArray();
      }
    }
  }
</script>
<template>
	<div class="mainLayout">
		<selection-sort v-bind:values="currentData"></selection-sort>
		<bubble-sort v-bind:values="currentData"></bubble-sort>
    <quick-sort v-bind:values="currentData"></quick-sort>
		<div class="masterButtons">
			<br clear="all" /><br />
			<button v-on:click="scrambleAll">scramble all</button>
			<br clear="all" /><br />
			<button v-on:click="setAscending">set all sorted</button>
			<br clear="all" /><br />		
			<button v-on:click="setDescending">set all inverted</button>
			<br clear="all" /><br />
			<button v-on:click="setNearlySorted">set all nearly sorted</button>
			<br clear="all" /><br />
			<button v-on:click="startAll" id="mainSort">sort all</button>
			<br clear="all" /><br />
		</div>
	</div>
</template>
