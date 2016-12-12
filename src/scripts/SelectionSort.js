$(document).ready(function() {

var Unit = function(val) {
  var self = this;
  self.value = ko.observable(val);
  self.inspecting = ko.observable(false);
  self.currentStart = ko.observable(false);
}

var JsArrayViewModel = function() {
	var self = this;
	self.data = ko.observableArray([]);
	self.elementCount = 50;
	self.delay = ko.observable(10);
	
	self.init = function() {
		var count = 0;
		var nums = [];
		var numData = [];
		while (count < self.elementCount) {
			var num = Math.ceil(Math.random() * self.elementCount);
			if (!nums.includes(num)) {
        nums.push(num);
        numData.push(new Unit(num));
				count++;
			}
		}
	  self.data(numData);
	};

  self.swap = function(targetIndex, sourceIndex) {
    var tempValue = self.data()[targetIndex].value();
    self.data()[targetIndex].value(self.data()[sourceIndex].value())
    self.data()[sourceIndex].value(tempValue);
  };
  
  self.checkSmallest = function(i) {
    if (self.data()[i].value() < self._smallest) {
      self._smallest = self.data()[i].value();
      self._smallestIndex = i;
    }
    self.data()[i].inspecting(false);
    if (i+1 <= self.data().length-1) {
      self.data()[i+1].inspecting(true);
      setTimeout(self.checkSmallest, self.delay(), i+1);
    }
    else {
      self.completeSelectionSortFrom();
    }
  }
  
  self.startSelectionSortFrom = function(i) {
	  if (i > self.data().length-1) {
	    return;
	  }
	  var delay = 50;
    self._smallestIndex = i;
    self._startingIndex = i;
    self._smallest = self.data()[self._smallestIndex].value();
    self.data()[self._startingIndex].inspecting(true);
    self.data()[self._startingIndex].currentStart(true);
    setTimeout(self.checkSmallest, self.delay(), self._startingIndex);
  };

  self.completeSelectionSortFrom = function() {
    console.log('smallest: ' + self._smallest + '[' + self._smallestIndex + ']');
    self.swap(self._startingIndex, self._smallestIndex);
    self.data()[self._startingIndex].currentStart(false);
    self.startSelectionSortFrom(self._startingIndex+1);
  };
  
	self.selectionSort = function() {
    self.startSelectionSortFrom(0);
	}
	
	
	self.init();
};

var vm = new JsArrayViewModel();

ko.applyBindings(vm, "#selectionSort");
});

