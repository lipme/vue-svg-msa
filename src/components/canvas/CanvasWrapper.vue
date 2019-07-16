<template>
  <div>
    <canvas :width="width" :height="height" ref="my-canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: { type: Number },
    height: { type: Number },
  },
  data() {
    return {
      // By creating the provider in the data property, it becomes reactive,
      // so child components will update when `context` changes.
      provider: {
        // This is the CanvasRenderingContext that children will draw to.
        context: null,
      },
    };
  },

  // Allows any child component to `inject: ['provider']` and have access to it.
  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    // We can't access the rendering context until the canvas is mounted to the DOM.
    // Once we have it, provide it to all child components.
    this.provider.context = this.$refs['my-canvas'].getContext('2d');
  },
};
</script>
