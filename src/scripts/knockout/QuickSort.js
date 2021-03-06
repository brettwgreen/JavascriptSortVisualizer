var QS_Unit = function(val) {
	var self = this;
	self.value = ko.observable(val);
	self.inspecting = ko.observable(false);
	self.currentPivot = ko.observable(
		false);
}
var QuickSortVM = function(randomNumsFunction) {
	var self = this;
	self.data = ko.observableArray([]);
	self.getRandomNums = randomNumsFunction;
	self.delay = ko.observable(10);
	self.setData = function(nums) {
		var numData = [];
		for (var i=0; i<nums.length; i++) {
			numData.push(new QS_Unit(nums[i]));
		};
		self.data(numData);
	};
	self.init = function(initData) {
		self.setData(self.getRandomNums());
	};
	self.swap = function(targetIndex,
		sourceIndex) {
		var tempValue = self.data()[
			targetIndex].value();
		var tempInspecting = self.data()[
			targetIndex].inspecting();
		var tempCurrentStart = self.data()[
			targetIndex].currentStart();
		self.data()[targetIndex].value(self
			.data()[sourceIndex].value());
		self.data()[targetIndex].inspecting(
			self.data()[sourceIndex].inspecting()
		);
		self.data()[targetIndex].currentStart(
			self.data()[sourceIndex].currentStart()
		);
		self.data()[sourceIndex].value(
			tempValue);
		self.data()[sourceIndex].inspecting(
			tempInspecting);
		self.data()[sourceIndex].currentStart(
			tempCurrentStart);
	};
	self.partition = function(pivotValue,
		startIndex, endIndex, currentIndex,
		left, right) {
		if (currentIndex - 1 >= startIndex) {
			self.data()[currentIndex - 1].inspecting(
				false);
		}
		if (currentIndex > endIndex) {
			self.completePartition(pivotValue,
				startIndex, endIndex, left,
				right);
		} else {
			self.data()[currentIndex].inspecting(
				true);
			var value = self.data()[
				currentIndex].value();
			if (value > pivotValue) {
				right.push(value);
			} else {
				left.push(value);
			}
			setTimeout(self.partition, self.delay(),
				pivotValue, startIndex, endIndex,
				currentIndex + 1, left, right);
		}
	};
	self.completePartition = function(
		pivotValue, startIndex, endIndex,
		left, right) {
		self.partitionCount++;
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
			self.data()[i].value(newArray[x]);
			self.data()[i].currentPivot(false);
			x++;
		}
		var arr = [];
		for (var j = 0; j < self.data().length; j++) {
			arr.push(self.data()[j].value());
		}
		// do left side
		if (left.length > 0) {
			var lStartIndex = startIndex;
			var lEndIndex = startIndex + left.length -
				2;
			var lPivotValue = left[left.length -
				1];
			self.data()[lEndIndex + 1].currentPivot(
				true);
			//console.log("partioning left side from " + lStartIndex + " to " + lEndIndex + ", pivot=" + lPivotValue);
			setTimeout(self.partition, self.delay(),
				lPivotValue, lStartIndex,
				lEndIndex, lStartIndex, [], []);
		}
		// do right side
		if (right.length > 0) {
			var rStartIndex = endIndex - right
				.length + 2;
			var rEndIndex = endIndex;
			var rPivotValue = right[right.length -
				1];
			self.data()[endIndex + 1].currentPivot(
				true);
			//console.log("partioning right side from " + rStartIndex + " to " + rEndIndex + ", pivot=" + rPivotValue);
			setTimeout(self.partition, self.delay(),
				rPivotValue, rStartIndex,
				rEndIndex, rStartIndex, [], []);
		}
	};
	self.startQuickSort = function() {
		var startIndex = 0;
		self.partitionCount = 0;
		var endIndex = self.data().length -
			1;
		var pivotValue = self.data()[
			endIndex].value();
		self.data()[endIndex].currentPivot(
			true);
		setTimeout(self.partition, self.delay(),
			pivotValue, startIndex, endIndex -
			1, startIndex, [], []);
	};
	self.sort = function() {
		console.log("started quicksort at " + new Date());
		self.startQuickSort();
	};
	self.init();
};