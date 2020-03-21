<template>
  <v-dialog v-model="dialog" width="680" scrollable persistent>
    <v-card>
      <v-card-title>{{ getTitle }}</v-card-title>
      <v-card-text>
        <template v-for="seq in seqs">
          <v-textarea
            :key="seq.name"
            :value="getFastaFormattedSeq(seq)"
            flat
            readonly
            auto-grow
            dense
            class="displayseq"
          >
          </v-textarea>
        </template>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-clipboard:copy="getFastaFormattedSeqs" class="primary" dark text>Copy</v-btn>
        <v-btn class="primary" dark text @click="close()">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
    return { dialog: true, currentseqs: this.seqs };
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
  methods: {
    getFastaFormattedSeq(s) {
      const formattedseq = s.seq.replace(/\.|-/g, '').replace(/(.{60})(?=.)/g, '$1\n');

      return `>${s.name}\n${formattedseq}`;
    },
    close() {
      this.$emit('close');
      this.dialog = false;
    }
  }
};
</script>

<style>
.displayseq {
  font-family: 'Courier';
}
</style>
