<template>
  <v-app>
    <v-content>
      <router-view></router-view>
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
