const Vue = require('vue');
const Main = require('./Main.vue');
$(document).ready(function() {
  new Vue({
    el: '#main',
    render: function (createElement) {
      return createElement(Main, {propsData: {numberOfElements: 50}});
    }
  })
});
