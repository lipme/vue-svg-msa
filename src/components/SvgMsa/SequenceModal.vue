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

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 2px auto;
  padding: 30px 30px;
  background-color: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
  font-family: 'Courier';
  text-align: left;
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
  text-align: center;
}

.modal-body {
  font-family: 'Courier';
}

.modal-default-button {
  float: right;
  padding: 5px 10px;
  margin: auto 5px;
  border: none;
  border-radius: 2px;
  background-color: rgb(196, 194, 194);
}
.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}
.modal-footer {
  padding: 10px 10px;
}
.displayseq {
  /* width: 500px; */
  max-height: 400px;
  overflow: auto;
  /* user-select: text; */
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
