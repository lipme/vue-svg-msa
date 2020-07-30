export default class Metadatas {
  constructor(metadataArray) {
    this.metadatas = metadataArray;
  }
  exists(i) {
    return this.metadatas.find(m => m.metadata_id === i) ? true : false;
  }
  getObject(i) {
    return this.exists(i) ? this.metadatas.find(m => m.metadata_id === i) : null;
  }
  getValue(i, i2) {
    if (this.getObject(i) == null || !this.getObject(i).values.find(v => v.value_id === i2)) {
      return null;
    } else {
      return this.getObject(i).values.find(v => v.value_id === i2);
    }
  }

  /**
   * Get the style of this metadata.
   * Consolidate the style props, for instance convert
   * 'fill_opacity' to 'fill-opacity'
   * Put default opacity value is none is defined
   * @param {*} defOpacity the default opacity value
   */
  getStyle(i, i2, defOpacity) {
    if (this.getValue(i, i2) != null) {
      var o_style = Object.assign({}, this.getValue(i, i2));
      if (o_style.hasOwnProperty('fill')) {
        o_style['fill-opacity'] = o_style.hasOwnProperty('fill_opacity')
          ? o_style.fill_opacity
          : defOpacity;
      } else {
        o_style['fill'] = 'white'; // ????
        o_style['fill-opacity'] = 0;
      }
      if (o_style.hasOwnProperty('stroke_dasharray')) {
        o_style['stroke-dasharray'] = o_style.stroke_dasharray;
      }
      return o_style;
    } else {
      return {};
    }
  }
}
