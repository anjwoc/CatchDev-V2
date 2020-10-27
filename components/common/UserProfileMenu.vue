<template>
  <v-menu class="elevation-0" bottom left min-width="200px" rounded offset-y>
    <template v-slot:activator="{on}">
      <v-btn icon x-large v-on="on">
        <v-avatar size="36">
          <img :src="me.imgSrc" alt="" />
        </v-avatar>
      </v-btn>
    </template>
    <v-card elevation="0">
      <v-list-item-content class="justify-center">
        <div class="elevation-0 mx-auto text-center">
          <v-avatar>
            <img :src="me.imgSrc" alt="" />
          </v-avatar>
          <h3>{{ me.name }}</h3>
          <p class="caption mt-1">
            {{ me.email }}
          </p>
          <ul class="profile_list pl-0">
            <li>내 프로필</li>
            <li @click="$router.push({path: '/write'})">스터디 모집</li>
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
    data() {
      return {
        items: [{title: 'Click Me1'}, {title: 'Click Me2'}, {title: 'Click Me3'}, {title: 'Click Me 4'}],
        user: {
          initials: 'JD',
          fullName: 'John Doe',
          email: 'john.doe@doe.com',
        },
      };
    },
    methods: {
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
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
  };
</script>

<style scoped></style>
