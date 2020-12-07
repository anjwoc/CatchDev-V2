<template>
  <v-app class="flex-container">
    <header class="container" :style="{ 'box-shadow': '0 1px 0 0 #e6e7eb' }">
      <v-toolbar class="pa-0" flat>
        <v-toolbar-title
          class="font-weight-bold"
          style="cursor: pointer; font-size: 28px"
          @click="$router.push('/')"
        >
          CatchStudy
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
        </div>
      </v-toolbar>
    </header>

    <div>
      <nuxt />
    </div>
    <footer class="flex_item" style="bottom: 0">
      <v-row class="footer_content" style="height: 200px">
        <v-container>
          <h3 class="mb-2">CatchDev Platform</h3>
          <p>github ID: anjwoc</p>
          <p>gmail: anjwoc12@gmail.com</p>
          <p>phone number: 010-4102-5826</p>
        </v-container>
      </v-row>
    </footer>
  </v-app>
</template>

<script>
  import UserProfileMenu from '@/components/UserProfileMenu';
  export default {
    components: {
      UserProfileMenu,
    },
    methods: {
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
      me() {
        return this.$store.state.users.me;
      },
    },
  };
</script>
<style scoped>
  .flex-container {
    display: flex;
    flex-direction: column;
  }

  .flex_item {
    margin-top: auto;
  }
</style>
