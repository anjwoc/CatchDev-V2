<template>
  <v-app>
    <header class="container" :style="{ 'box-shadow': '0 1px 0 0 #e6e7eb' }">
      <v-toolbar class="pa-0" flat>
        <v-toolbar-title
          class="font-weight-bold"
          style="cursor: pointer; font-size: 28px"
          @click="$router.push('/')"
        >
          CatchDev
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <div v-if="!me">
          <v-btn
            class="toolbar-btn text-capitalize font-weight-bold"
            to="/login"
            depressed
          >
            Sign in
          </v-btn>

          <v-btn
            class="toolbar-btn text-capitalize font-weight-bold"
            depressed
            outlined
            style="border: 1px solid grey"
            to="/signup"
          >
            Sign up
          </v-btn>
        </div>
        <div v-else>
          <user-profile-menu />
          <!-- <div>로그인 했음</div> -->
        </div>
        <template v-if="!isAuth" v-slot:extension>
          <v-tabs
            active-class="tab__active"
            class="pa-0 ma-0"
            v-model="tab"
            grow
            slider-size="0"
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab" @change="onChangeTabs">
              <span class="text-capitalize">{{ tab }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </header>

    <div>
      <nuxt />
    </div>
  </v-app>
</template>

<script>
  import UserProfileMenu from '@/components/UserProfileMenu';
  export default {
    components: {
      UserProfileMenu,
    },
    data() {
      return {
        tab: '',
        tabs: [
          '전체',
          '어학',
          '고시/공무원',
          '취미/교양',
          '프로그래밍',
          '자율',
          '기타',
        ],
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
            this.$router.push({ path: '/' });
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
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
