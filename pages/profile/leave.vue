<template>
  <v-container class="mt-4 pa-10" style="height: 105vh; border-radius: 10px">
    <div class="text-h4 font-weight-bold d-flex justify-center">회원 탈퇴</div>
    <div class="caption font-weight-black d-flex justify-center mt-4 mb-7">
      회원 탈퇴시 관련 데이터를 복구할 수 없습니다.
    </div>
    <div class="caption font-weight-black d-flex justify-center mb-7">
      정말 탈퇴하시겠습니까?
    </div>
    <v-row align="center" justify="center">
      <v-btn class="pink white--text" x-large @click="onDeleteAccount">
        탈퇴하기
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    methods: {
      onDeleteAccount() {
        this.$store
          .dispatch('users/withdrawal', {
            userId: this.me && this.me.id,
          })
          .then(res => {
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

<style lang="scss" scoped></style>
