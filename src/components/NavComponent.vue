<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
        <div>
        <v-img
          v-once
          class="mt-2"
          style="cursor: pointer"
          src="../assets/Color logo - no background.png"
          lazy-src="../assets/Color logo - no background.png"
          alt="logo"
          width="70"
          position="center"
          fill
          id="navBarImg"
        >
        </v-img>
    </div>
        <div class="pt-15">
            <v-list color="#131313">
                <v-list-item-group
                    v-model="model"
                    active-class="activate"
                    color="#FFFFFF"
                >
                    <v-list-item to="/profile" style="color:white">
                    <span class="material-icons mr-1">person</span>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="rides" style="color:white">
                    <span class="material-icons mr-1">two_wheeler</span>
                    <v-list-item-content>
                        <v-list-item-title>Your Rides</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/old-videos">
                    <span class="material-icons mr-1">slideshow</span>
                    <v-list-item-content>
                        <v-list-item-title>Old Videos</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/settings" style="color:white">
                    <span class="material-icons mr-1">settings</span>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/support" style="color:white">
                    <span class="material-icons mr-1">info</span>
                    <v-list-item-content>
                        <v-list-item-title>Help & Support</v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </div>
        <span class="collapse-icon">
            <v-btn color="black" rounded small class="mr-5 toggler"><span class="material-icons">light_mode</span>Light</v-btn>
            <v-btn class="toggler" color="black" rounded small><span class="material-icons">dark_mode</span>Dark</v-btn>
        </span>
    </div>
</template>

<script>
import { toggleSidebar, sidebarWidth } from './state';
// import NavbarLinks from './NavbarLinks.vue';
export default {
    data: () => ({
      model: 1,
    }),
    props: {},
    // components: { NavbarLinks },
    setup() {
        return { toggleSidebar, sidebarWidth}
    }
}
</script>

<style>
:root {
    --sidebar-bg-color: #131313;
    --sidebar-item-hover: #131313;
    --sidebar-item-active: #42B546;
}
</style>

<style scoped>
.sidebar {
    color: #131313;
    background-color: var(--sidebar-bg-color);
    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
}
.collapse-icon{
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    transition: 0.2s linear;
}

.rotate-180{
    transform: rotate(180deg);
    transition: 0.2s linear;
}

.toggler{
    color: white;
    text-transform: capitalize;
}
.tabs{
    text-transform: capitalize;
    color: #42B546;
    background-color: #131313;
    margin-left: -5px;
    border-left: 1px solid #42B546;
}
.vertical{
    margin-left: -10px;
    display: flex;
    justify-content: left;
}
.activate{
    border-left: 2px solid #42B546;
    color: #42B546;
}
</style>