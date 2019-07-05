<template>
  <v-app>
    <v-content>
      <multiple-alignment></multiple-alignment>
    </v-content>
  </v-app>
</template>

<script>
import MultipleAlignment from './views/MultipleAlignment.vue';

export default {
  name: 'App',
  components: {
    MultipleAlignment,
  },
};
</script>
