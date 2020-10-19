<template>
  <v-app>
    <div :style="{'box-shadow': '0 1px 0 0 #e6e7eb'}">
      <v-toolbar class="container pa-0" flat>
        <v-toolbar-title class="font-weight-bold" style="cursor: pointer" @click="$router.push('/')"> Catch Dev </v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-if="!me">
          <v-btn class="toolbar-btn text-capitalize" to="/login" depressed> Sign in </v-btn>

          <v-btn class="toolbar-btn text-capitalize" depressed outlined style="border: 1px solid grey" to="/signup"> Sign up </v-btn>
        </div>
        <div v-else>
          <div>로그인 했음</div>
          <v-btn @click="onLogout">로그아웃</v-btn>
        </div>
        <template v-if="!isAuth" v-slot:extension>
          <v-tabs class="pa-0 ma-0" v-model="tab" grow slider-size="0">
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab" @change="onChangeTabs">
              <span class="text-capitalize">{{ tab }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </div>
    <div>
      <v-carousel v-if="!isAuth" cycle height="300" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
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
        tabs: ['전체', '어학', '고시/공무원', '취미/교양', '프로그래밍', '자율', '기타'],
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
        colors: ['indigo', 'warning', 'pink darken-2', 'red lighten-1', 'deep-purple accent-4'],
        slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Vuetify.js',
      };
    },
    methods: {
      onChangeTabs() {
        console.log('change tab');
      },
      onLogout() {
        this.$store
          .dispatch('users/logOut')
          .then(() => {
            this.$router.push({path: '/'});
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    mounted() {},
    computed: {
      isAuth() {
        const name = this.$route.name;
        const list = ['login', 'signup'];
        return list.includes(name);
      },
      me() {
        return this.$store.state.users.me;
      },
    },
  };
</script>
<style scoped></style>
