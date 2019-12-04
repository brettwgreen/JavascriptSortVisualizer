$(document).ready(function() {
	var MasterVm = function() {
		var self = this;
		self.getRandomArray = function(numberOfElements) {
			var count = 0;
			numberOfElements = (numberOfElements) ? numberOfElements : 50;
			var nums = [];
			while (count < numberOfElements) {
				var num = Math.ceil(Math.random() * numberOfElements);
				if (!nums.includes(num)) {
					nums.push(num);
					count++;
				}
			}
			return nums;
		};
		self.getDescendingArray = function(numberOfElements) {
			var nums = [];
			while (numberOfElements > 0) {
				nums.push(numberOfElements-1);
				numberOfElements--;
			}
			return nums;
		};	
		self.getAscendingArray = function(numberOfElements) {
			var nums = [];
			var current = 0;			
			while (current < numberOfElements) {
				nums.push(current);
				current++;
			}
			return nums;
		};	
		self.getNearlySortedArray = function(numberOfElements) {
			var nums = [];
			var current = 0;
			while (current < numberOfElements) {
				nums.push(current);
				current++
			}
			var swapTotal = 5;
			var swaps = 0;
			while (swaps < swapTotal) {
				var num1 = Math.ceil(Math.random() * (numberOfElements-1));
				var num2 = num1+1;
				if (num2 < numberOfElements) {
					var temp = nums[num2];
					nums[num2] = nums[num1];
					nums[num1] = temp;
					swaps++;
				}
			}
			return nums;
		};				
		self.quickSort = new QuickSortVM(self.getRandomArray);
		self.bubbleSort = new BubbleSortVM(self.getRandomArray);
		self.selectionSort = new SelectionSortVM(self.getRandomArray);
		self.startAll = function() {
			self.quickSort.sort();
			self.bubbleSort.sort();
			self.selectionSort.sort();
		};
		self.scrambleAll = function() {
			self.quickSort.init();
			self.bubbleSort.init();
			self.selectionSort.init();
		};
		self.scrambleAllSame = function() {
			var data = self.getRandomArray(50);
			self.selectionSort.setData(data);
			self.bubbleSort.setData(data);
			self.quickSort.setData(data);
		};
		self.setDescending = function() {
			var data = self.getDescendingArray(50);
			self.selectionSort.setData(data);
			self.bubbleSort.setData(data);
			self.quickSort.setData(data);
		};
		self.setAscending = function() {
			var data = self.getAscendingArray(50);
			self.selectionSort.setData(data);
			self.bubbleSort.setData(data);
			self.quickSort.setData(data);
		};		
		self.setNearlySorted = function() {
			var data = self.getNearlySortedArray(50);
			self.selectionSort.setData(data);
			self.bubbleSort.setData(data);
			self.quickSort.setData(data);
		};
		
	};
	
	var vm = new MasterVm();
	ko.applyBindings(vm);
});