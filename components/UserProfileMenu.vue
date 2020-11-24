<template>
  <v-menu class="elevation-0" bottom left min-width="200px" rounded offset-y>
    <template v-slot:activator="{ on }">
      <v-btn icon x-large v-on="on">
        <v-avatar size="36">
          <v-img :src="me.imgSrc" alt="" refererpolicy="no-referrer" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card elevation="0">
      <v-list-item-content class="justify-center">
        <div class="elevation-0 mx-auto text-center">
          <v-avatar>
            <v-img :src="me.imgSrc" :lazy-src="me.imgSrc" alt="" />
          </v-avatar>
          <h3>{{ me.name }}</h3>
          <p class="caption mt-1">
            {{ me.email }}
          </p>
          <ul class="profile_list pl-0">
            <li @click="$router.push({ path: '/profile' })">내 프로필</li>
            <li @click="$router.push({ path: '/write/step1' })">스터디 모집</li>
            <li>회원 탈퇴</li>
            <li @click="onLogout">로그 아웃</li>
          </ul>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
  export default {
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

<style scoped></style>
