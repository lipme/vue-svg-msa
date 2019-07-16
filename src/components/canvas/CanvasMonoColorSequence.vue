<script>
// Note how there's no template or styles in this component.

export default {
  // Gets us the provider property from the parent <my-canvas> component.
  inject: ['provider'],

  props: {
    rectX: { type: Number },
    rectY: { type: Number },
    textY: { type: Number },
    atextX: { type: Array },
    width: { type: Number },
    height: { type: Number },
    sequence: { type: Object },
    textFontSize: { type: Number },
  },

  render() {
    // Since the parent canvas has to mount first, it's *possible* that the context may not be
    // injected by the time this render function runs the first time.
    if (!this.provider.context) return;
    const ctx = this.provider.context;

    // ctx.beginPath();
    ctx.fillStyle = this.sequence.color;
    ctx.fillRect(this.rectX, this.rectY, this.width, this.height);
    // ctx.fill();

    const aatextX = this.atextX;
    const ttextY = this.textY;
    // ctx.font = this.textFontSize;
    ctx.font = 'monospace';
    // ctx.font = 'Arial';
    ctx.fillStyle = 'black';

    
    this.sequence.seq.split('').forEach((e, i) => {
      ctx.fillText(e, aatextX[i], ttextY);
    });
  },
};
</script>
