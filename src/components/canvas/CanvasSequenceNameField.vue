<script>
// Note how there's no template or styles in this component.

export default {
  // Gets us the provider property from the parent <canvas-wrapper> component.
  inject: ['provider'],
  props: {
    y: { type: Number },
    textFontSize: { type: Number },
    name: { type: String },
    offsetX: { type: Number },
  },
  computed: {
    displaySeqNameLength() {
      return this.offsetX / 10;
    },
    displayedName() {
      if (this.name.length >= this.displaySeqNameLength) {
        let title = '';
        const splitName = this.name.split('');
        splitName.forEach((x) => {
          if (title.length <= this.displaySeqNameLength) title = title.concat(String(x));
        });
        title = title.concat('...');
        return title;
      } return this.name;
    },
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    // ctx.font = "normal normal "+ this.textFontSize + "Monospace";
    ctx.font = 'normal normal 14px Monospace';
    // ctx.fillStyle = "black";
    ctx.fillText(this.displayedName, 1, this.y);
  },
};
</script>
