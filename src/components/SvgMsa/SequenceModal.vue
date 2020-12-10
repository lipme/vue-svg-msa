<!-- Copyright 2020 [LIPM]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
   limitations under the License.
-->
<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
              <h3>{{ getTitle }}</h3>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <template v-for="seq in seqs">
                <pre :key="seq.name" class="displayseq">{{ getFastaFormattedSeq(seq) }}</pre>
              </template>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button v-clipboard:copy="getFastaFormattedSeqs" class="modal-default-button">
                Copy
              </button>
              <button class="modal-default-button" @click="$emit('close')">Close</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'SequenceModal',
  props: {
    seqs: {
      type: Array,
      default() {
        return [];
      }
    }
  },

  data() {
    return { currentseqs: this.seqs };
  },
  computed: {
    getTitle() {
      return this.currentseqs
        .map(s => s.name)
        .filter((s, i) => i < 3)
        .join();
    },
    getFastaFormattedSeqs() {
      if (this.currentseqs) {
        return this.currentseqs.map(s => this.getFastaFormattedSeq(s)).join('\n');
      }
      return '';
    }
  },
  watch: {
    seqs(v) {
      this.currentseqs = v;
    }
  },
  methods: {
    getFastaFormattedSeq(s) {
      const formattedseq = s.seq.replace(/\.|-/g, '').replace(/(.{60})(?=.)/g, '$1\n');

      return `>${s.name}\n${formattedseq}`;
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* color of the background when dialog is visible */
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 470px;
  margin: 2px auto;
  padding: 8px 8px;
  background-color: #fff;
  border-radius: 3px;
  transition: all 0.3s ease;
  text-align: left;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  text-align: center;
}

.modal-default-button {
  /* float: right; */
  padding: 5px 10px;
  margin: auto 5px;
  border: none;
  border-radius: 2px;
  background-color: rgb(196, 194, 194);
}

.modal-footer {
  padding: 5px 5px;
}
.displayseq {
  max-height: 400px;
  overflow: auto;
  font-family: monospace;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
