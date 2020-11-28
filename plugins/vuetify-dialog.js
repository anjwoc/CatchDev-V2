import Vue from 'vue';
import vuetify from 'vuetify';
import VuetifyDialogPlugin from 'vuetify-dialog';
import 'vuetify-dialog/dist/vuetify-dialog.css';

Vue.use(VuetifyDialogPlugin, {
  context: {
    vuetify,
  },
});
