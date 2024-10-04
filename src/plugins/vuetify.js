import Vue from 'vue';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdiSvg' || 'mdi' || 'mdiSvg' || 'md',
        values: {}
    },
    breakpoint: {
        scrollBarWidth: 16,
        thresholds: {
          xs: 600,
          sm: 960,
          md: 1280,
          lg: 1920
        }
    }
});
