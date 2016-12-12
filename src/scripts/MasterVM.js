$(document).ready(function() {
	var MasterVm = function() {
		var self = this;
		self.quickSort = new QuickSortVM();
		self.bubbleSort = new BubbleSortVM();
		self.selectionSort = new SelectionSortVM();
		self.startAll = function() {
			self.quickSort.sort();
			self.bubbleSort.sort();
			self.selectionSort.sort();
		}
	};
	var vm = new MasterVm();
	ko.applyBindings(vm);
});