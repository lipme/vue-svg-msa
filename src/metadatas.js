// Copyright 2020 [LIPM]
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
//    limitations under the License.

//  NOT USED
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
