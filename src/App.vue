<template>
  <v-app>
    <HeaderFile />
    <NavComponent />
    <v-main :style="{ 'margin-left': sidebarWidth }">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavComponent from './components/NavComponent.vue';
import HeaderFile from './components/HeaderFile.vue';
import { sidebarWidth } from './components/state';
export default {
  components: { NavComponent, HeaderFile },
  setup() {
    return { sidebarWidth }
  },
  name: 'App'
};
</script>

