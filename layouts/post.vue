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
      <v-row
        class="footer_content"
        style="height: 200px; background-color: #1f254b"
      >
        <v-container class="vertical-center" style="justify-content: center">
          <div id="footer-logo">
            <svg
              class="mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="287"
              height="35"
              viewBox="0 0 68 35"
            >
              <text
                id="Catchs"
                transform="translate(0 28)"
                fill="#4ce4bd"
                font-size="29"
                font-family="Montserrat-Bold, Montserrat"
                font-weight="700"
              >
                <tspan x="0" y="0">CatchStudy</tspan>
              </text>
            </svg>
          </div>
          <div id="footer-copyright">
            Copyright (c) 2020 CatchStudy team All rights reserved.
          </div>
          <!-- <h2 class="">CatchStudy</h2> -->
          <!-- <p>github ID: anjwoc</p>
          <p>gmail: anjwoc12@gmail.com</p>
          <p>phone number: 010-4102-5826</p> -->
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
    background-color: #1f254b;
  }
  #footer-copyright {
    height: 26px;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 20px;
    font-weight: 300;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.2;
    letter-spacing: normal;
    text-align: center;
    color: #4ce4bd;
    display: inline-block;
    margin-top: 6.5px;
    margin-left: 14.4px;
  }
</style>
