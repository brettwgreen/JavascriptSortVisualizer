const Vue = require('vue');
const SelectionSort = require('./SelectionSort.vue');
$(document).ready(function() {
  var getRandomArray = function(numberOfElements) {
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

  new Vue({
    el: '#selectionSort',
    render: function (createElement) {
        return createElement(
          SelectionSort, 
          {
            props: {
              randomNumsFunction: getRandomArray
            }
          }
        );
      }
    })
});
