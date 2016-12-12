$(document).ready(function() {
	var MasterVm = function() {
		var self = this;
		self.quickSort = new QuickSortVM();
		self.bubbleSort = new BubbleSortVM();
		self.selectionSort = new SelectionSortVM();
	};
	var vm = new MasterVm();
	ko.applyBindings(vm);
});