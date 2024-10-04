<template>
    <div class="appBar">
        <v-app-bar
        color="#131313"
      app
      elevation="0"
      fixed
      width=""
      :min-width="
        xlargeWidth || largeWidth
          ? '100%'
          : mediumWidth
          ? '100%'
          : smallWidth
          ? '100%'
          : '100%'
      "
      :height="70"
      class="m-16 appBar"
    >
      <!-- LOGO -->
      <div>
        <v-img
          v-once
          class="mt-2"
          style="cursor: pointer"
          src="../assets/Color logo - no background.png"
          lazy-src="../assets/Color logo - no background.png"
          alt="logo"
          width="150"
          position="center"
          fill
          id="navBarImg"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" justify="center">
              <v-progress-circular
                indeterminate
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </div>
      <v-spacer></v-spacer>
      <v-flex class="d-flex justify-end" align-self-start>
        <v-menu rounded="lg">
          <template v-slot:activator="{ on, attrs }">
            <v-card
              rounded="lg"
              depressed
              flat
              color="#131313"
              class="ml-2 mt-2 mb-2 pa-1"
              v-bind="attrs"
              v-on="on"
            >
              <template>
                <div>
                  <v-avatar size="40" class="image">
                    <v-img
                        src="../assets/taylor-8Vt2haq8NSQ-unsplash.jpg"
                        lazy-src="https://picsum.photos/id/11/10/6">
                    </v-img>
                  </v-avatar>
                </div>
              </template>
            </v-card>
          </template>
        </v-menu>
      </v-flex>
    </v-app-bar>
    </div>
</template>

<script>
export default {
    name: 'HeaderFile',
    data () {
        return {
        }
    },
    computed: {
    isLargeScreen: {
      get () {
        return this.$vuetify.breakpoint.width > 1024
      }
    },
    xlargeWidth: {
      get () {
        return this.$vuetify.breakpoint.xl
      }
    },
    xtraSmallWidth: {
      get () {
        return this.$vuetify.breakpoint.xs
      }
    },
    mediumWidth: {
      get () {
        return this.$vuetify.breakpoint.md
      }
    },
    largeWidth: {
      get () {
        return this.$vuetify.breakpoint.lg
      }
    },
    smallWidth: {
      get () {
        return this.$vuetify.breakpoint.sm
      }
    }
  },
}
</script>

<style scoped>
.appBar{
  color: #131313;
}
.image{
  border-color: #42B546;
}
</style>