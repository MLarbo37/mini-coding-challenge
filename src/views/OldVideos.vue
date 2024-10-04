<template>
  <v-app style="background-color:#000000">
    <HelloWorld class="mt-10" />
  </v-app>
</template>

<script>
  import HelloWorld from '../components/HelloWorld.vue';

  export default {
    name: 'HomePage',

    components: {
    HelloWorld
},
  }
</script>
