<template>
  <v-app>
    <v-toolbar app> </v-toolbar>
    <v-content>
      <multiple-alignment></multiple-alignment>
    </v-content>
  </v-app>
</template>

<script>
import MultipleAlignment from './views/MultipleAlignment';

export default {
  name: 'App',
  components: {
    MultipleAlignment
  }
};
</script>
