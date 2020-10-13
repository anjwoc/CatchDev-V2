<template>
  <v-app>
    <div :style="{ 'box-shadow': '0 1px 0 0 #e6e7eb' }">
      <v-toolbar class="container pa-0" flat>
        <v-toolbar-title
          class="font-weight-bold"
          style="cursor: pointer"
          @click="$router.push('/')"
        >
          Catch Dev
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn class="toolbar-btn text-capitalize" href="/login" depressed>
          Sign in
        </v-btn>

        <v-btn
          class="toolbar-btn text-capitalize"
          depressed
          outlined
          style="border: 1px solid grey"
        >
          Sign up
        </v-btn>

        <template v-slot:extension>
          <v-tabs class="pa-0 ma-0" v-model="tab">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab" @change="onChangeTabs">
              <span class="text-capitalize">{{ tab }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>

    <v-container>
      <nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      tab: '',
      text: 'test',
      tabs: ['web', 'shopping', 'videos', 'images', 'news'],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  methods: {
    onChangeTabs() {
      console.log('change tab')
    },
  },
}
</script>
<style  scoped>
</style>