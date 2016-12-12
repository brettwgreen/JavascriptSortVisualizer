$(document).ready(function() {
	var MasterVm = function() {
		var self = this;
		self.elementCount = 50;
		self.getRandomArray = function(num) {
			var count = 0;
			var nums = [];
			while (count < self.elementCount) {
				var num = Math.ceil(Math.random() * self.elementCount);
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
	};
	var vm = new MasterVm();
	ko.applyBindings(vm);
});