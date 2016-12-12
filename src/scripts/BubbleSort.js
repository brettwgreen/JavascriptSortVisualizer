var BS_Unit = function(val) {
	var self = this;
	self.value = ko.observable(val);
	self.inspecting = ko.observable(false);
	self.currentStart = ko.observable(
		false);
}
var BubbleSortVM = function() {
	var self = this;
	self.data = ko.observableArray([]);
	self.elementCount = 50;
	self.delay = ko.observable(10);
	self.init = function() {
		var count = 0;
		var nums = [];
		var numData = [];
		while (count < self.elementCount) {
			var num = Math.ceil(Math.random() *
				self.elementCount);
			if (!nums.includes(num)) {
				nums.push(num);
				numData.push(new BS_Unit(num));
				count++;
			}
		}
		self.data(numData);
	};
	self.swap = function(targetIndex,
		sourceIndex) {
		var tempValue = self.data()[
			targetIndex].value();
		self.data()[targetIndex].value(self
			.data()[sourceIndex].value())
		self.data()[sourceIndex].value(
			tempValue);
	};
	self.doTheBubble = function(i) {
		if (i + 1 <= self.data().length - 1) {
			if (self.data()[i].value() > self.data()[
					i + 1].value()) {
				self.swap(i, i + 1);
				self._swapOccurred = true;
			}
		}
		self.data()[i].inspecting(false);
		self.data()[i].currentStart(false);
		if (i + 1 <= self.data().length - 1) {
			self.data()[i + 1].currentStart(
				true);
			self.data()[i + 1].inspecting(true);
			setTimeout(self.doTheBubble, self.delay(),
				i + 1);
		} else {
			self.completeBubbleSortLoop();
		}
	};
	self.startBubbleSort = function() {
		self._swapOccurred = false;
		self._startingIndex = 0;
		self.data()[self._startingIndex].inspecting(
			true);
		self.data()[self._startingIndex].currentStart(
			true);
		setTimeout(self.doTheBubble, self.delay(),
			self._startingIndex);
	};
	self.completeBubbleSortLoop =
		function() {
			if (self._swapOccurred) {
				self.startBubbleSort();
			}
		};
	self.bubbleSort = function() {
		self.startBubbleSort();
	}
	self.init();
};