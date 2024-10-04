<template>
  <v-container>
    <v-card class="videos" flat>
      <v-toolbar flat style="background-color: #000000">
        <h1 class="head">Old Videos</h1>

        <template v-slot:extension>
          <v-tabs v-model="active_tab" align-with-title>
            <v-tabs-slider color="green"></v-tabs-slider>

            <v-tab class="tabs" v-for="item in items" :key="item.index" active-class="activate" style="color:white">
              {{item.name}}
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="active_tab" class="mt-5">
        <v-tab-item v-for="item in items" :key=item.index>
          <upload-video v-if="item.index == '0'" />
          <about-view v-else />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
import UploadVideo from '@/views/UploadVideo.vue';
import AboutView from '@/views/AboutView.vue';
export default {
  name: "HelloWorld",
  components: { UploadVideo, AboutView },
  data() {
    return {
      etags: [],
      eParts: [],
      formatData: {},
      filename: "",
      uploadId: "",
      file: null,
      tab: null,
      active_tab: 0,
      items: [
        { index: 0, name: 'Upload Video' },
        { index: 1, name: 'Recommended Rides' },
        { index: 2, name: 'Without Rides' },
        { index: 3, name: 'Manual Rides'}
      ]
    };
  }
};
</script>

<style scoped>
.videos {
  background-color: #000000 !important;
  color: white;
}
.head {
  color: white;
}
.tabs {
  text-transform: capitalize;
  color: white;
}
a{
  color: white !important;
}
a::after{
  color: #42b546;
}
.activate{
    color: #42B546 !important;
}
</style>

