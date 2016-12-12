$(document).ready(function() {
	var MasterVm = function() {
		var self = this;
		self.quickSort = new QuickSortVM();
		self.bubbleSort = new BubbleSortVM();
		self.selectionSort = new SelectionSortVM();
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
	};
	var vm = new MasterVm();
	ko.applyBindings(vm);
});