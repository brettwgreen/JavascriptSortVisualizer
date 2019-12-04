<script>
  const SelectionSort = require('./SelectionSort.vue')
  module.exports = {
    props: {
      numberOfElements: {
        type: Number,
        default() {
          return 50
        }
      }
    },
    components: {
      SelectionSort
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
        self.quickSort.sort();
        self.bubbleSort.sort();
        self.selectionSort.sort();
      },
		  scrambleAll() {
        self.quickSort.init();
        self.bubbleSort.init();
        self.selectionSort.init();
      },
		  scrambleAllSame() {
        var data = self.getRandomArray(50);
        self.selectionSort.setData(data);
        self.bubbleSort.setData(data);
        self.quickSort.setData(data);
      },
		  setDescending() {
        var data = self.getDescendingArray(50);
        self.selectionSort.setData(data);
        self.bubbleSort.setData(data);
        self.quickSort.setData(data);
      },
		  setAscending() {
        var data = self.getAscendingArray(50);
        self.selectionSort.setData(data);
        self.bubbleSort.setData(data);
        self.quickSort.setData(data);
      },
		  setNearlySorted() {
        var data = self.getNearlySortedArray(50);
        self.selectionSort.setData(data);
        self.bubbleSort.setData(data);
        self.quickSort.setData(data);
      }
    }
  }
</script>
<template>
	<div class="mainLayout">
		<selection-sort v-bind:random-nums-function="getDescendingArray"></selection-sort>
		<div class="masterButtons">
			<br clear="all" /><br />
			<button data-bind="click: scrambleAll">scramble all</button>
			<br clear="all" /><br />
			<button data-bind="click: scrambleAllSame">scramble all (use same data)</button>
			<br clear="all" /><br />
			<button data-bind="click: setDescending">set all inverted</button>
			<br clear="all" /><br />
			<button data-bind="click: setNearlySorted">set all nearly sorted</button>
			<br clear="all" /><br />
			<button data-bind="click: setAscending">set all sorted</button>
			<br clear="all" /><br />		
			<button data-bind="click: startAll" id="mainSort">sort all</button>
			<br clear="all" /><br />
		</div>
	</div>

</template>