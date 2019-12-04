<script>
module.exports = {
  props: {
    value: {
      type: Number,
      default: function() {
        0
      }
    }
  },
  data () {
    return {
	    inspecting: false,
      currentStart: false,
      sortIndex: this.value,
	    hitCount: 0
    }
  },
  watch: {
    inspecting (newValue) {
      this.hitCount++;
    }
  }
}
</script>
<template>
  <span>
    <div class="unit" v-bind:class="{inspecting: inspecting}" v-bind:style="{width: (value+10) + 'px'}"></div>
    <div v-show="currentStart" class="indicator"></div>
    <div class="clear"></div>
  </span>
</template>
