<template>
  <!-- draw a rectangle according to the value og the object rect -->
  <rect
    :x="rect.x"
    :y="rect.y"
    :height="rect.height"
    :width="rect.width"
    :style="rect.style"
    :class="rect.class"
  ></rect>
</template>

<script>
export default {
  props: {
    rect: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>
