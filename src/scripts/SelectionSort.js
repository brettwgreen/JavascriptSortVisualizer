var SS_Unit = function(val) {
	var self = this;
	self.value = ko.observable(val);
	self.inspecting = ko.observable(false);
	self.currentStart = ko.observable(false);
	self.hitCount = ko.observable(0);
	self.inspecting.subscribe(function(newValue) {
		if (newValue) {
			self.hitCount(self.hitCount()+1);
		}
	});
}
var SelectionSortVM = function(randomNumsFunction) {
	var self = this;
	self.data = ko.observableArray([]);
	self.getRandomNums = randomNumsFunction;
	self.delay = ko.observable(10);
	self.averageHits = ko.observable(0);
	self.swapCount = ko.observable(0);
	self.setData = function(nums) {
		var numData = [];
		for (var i=0; i<nums.length; i++) {
			numData.push(new SS_Unit(nums[i]));
		};
		self.data(numData);
		self.averageHits(Math.pow(nums.length,2));
	};
	self.init = function(initData) {
		self.setData(self.getRandomNums());
	};
	self.swap = function(targetIndex, sourceIndex) {
		if (targetIndex !== sourceIndex) {
			self.swapCount(self.swapCount()+1);
			var tempValue = self.data()[targetIndex].value();
			self.data()[targetIndex].value(self.data()[sourceIndex].value())
			self.data()[sourceIndex].value(tempValue);
		}
	};
	self.checkSmallest = function(i) {
		if (self.data()[i].value() < self._smallest) {
			self._smallest = self.data()[i].value();
			self._smallestIndex = i;
		}
		self.data()[i].inspecting(false);
		if (i + 1 <= self.data().length - 1) {
			self.data()[i + 1].inspecting(true);
			setTimeout(self.checkSmallest, self.delay(), i + 1);
		} else {
			self.completeSelectionSortFrom();
		}
	};
	self.actualHits = ko.computed(function() {
		var total = 0;
		for (var i=0; i<self.data().length; i++){
			total += self.data()[i].hitCount();
		}
		return total;
	});
	
	self.startSelectionSortFrom = function(i) {
		if (i > self.data().length - 1) {
			return;
		}
		self._smallestIndex = i;
		self._startingIndex = i;
		self._smallest = self.data()[self._smallestIndex].value();
		self.data()[self._startingIndex].inspecting(true);
		self.data()[self._startingIndex].currentStart(true);
		setTimeout(self.checkSmallest, self.delay(), self._startingIndex);
	};
	self.completeSelectionSortFrom = function() {
		self.swap(self._startingIndex, self._smallestIndex);
		self.data()[self._startingIndex].currentStart(false);
		self.startSelectionSortFrom(self._startingIndex + 1);
	};
	self.sort = function() {
		console.log("started selectionsort at " + new Date());
		// reset hit counts
		self.swapCount(0);
		for (var k=0; k<self.data().length; k++){
			self.data()[k].hitCount(0);
		}		
		self.startSelectionSortFrom(0);
	}
	self.init();
};