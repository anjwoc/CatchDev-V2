<template>
  <v-container
    class="mt-4 bg-lightgrey pa-10"
    style="height: 105vh; border-radius: 10px"
  >
    <div class="text-h4 font-weight-bold d-flex justify-center">
      User Profile
    </div>
    <div class="caption font-weight-black d-flex justify-center mb-7">
      유저의 프로필 정보를 수정할 수 있습니다.
    </div>
    <v-card class="pa-5 d-flex" elevation="0" width="100%">
      <v-col col="3">
        <div class="caption font-weight-bold grey--text text--darken-1">
          가입 날짜
        </div>
        <div class="text-h5 registed_date mt-4">
          <span class="font-weight-black">
            {{ user.createdAt.split('T')[0] }}
          </span>
        </div>
      </v-col>
      <v-col col="6">
        <div class="caption font-weight-bold grey--text text--darken-1">
          이메일
        </div>
        <div class="text-subtitle1 mt-4">
          <span class="font-weight-bold">{{ user.email }}</span>
        </div>
      </v-col>
      <v-col col="3">
        <div class="caption font-weight-bold grey--text text--darken-1">
          연동된 소셜 계정
        </div>
        <div class="vertical-center text-subtitle1 mt-4">
          <v-icon color="black">mdi-{{ user.socialType }}</v-icon>
          <span class="font-weight-bold text-capitalize">
            {{ user.socialType }}
          </span>
        </div>
      </v-col>
    </v-card>

    <v-card class="mt-5 pa-5 d-flex" elevation="0" width="100%" height="250">
      <v-col col="3">
        <div class="caption font-weight-bold grey--text text--darken-1">
          직업
        </div>
        <div class="text-subtitle1 registed_date mt-4">
          <v-text-field v-model="job"></v-text-field>
          <!-- <span class="font-weight-bold">{{ user.job }}</span> -->
        </div>
      </v-col>
      <v-col col="3">
        <div class="caption font-weight-bold grey--text text--darken-1">
          지역
        </div>
        <div class="vertical-center text-subtitle1 mt-4">
          <v-text-field v-model="location"></v-text-field>
          <!-- <span class="font-weight-bold">{{ user.location }}</span> -->
        </div>
      </v-col>
      <v-col col="6">
        <div class="caption font-weight-bold grey--text text--darken-1">
          프로필 이미지
        </div>
        <div class="d-flex align-center justify-center">
          <v-btn icon style="top: 3rem">
            <v-avatar size="100">
              <v-img :src="user.imgSrc" :lazy-src="user.imgSrc"></v-img>
            </v-avatar>
          </v-btn>
        </div>
      </v-col>
    </v-card>

    <v-card class="mt-5 pa-5 d-flex" elevation="0" width="100%" height="310">
      <v-col col="12">
        <div class="caption font-weight-bold grey--text text--darken-1">
          소개
        </div>
        <div class="text-subtitle1 mt-4">
          <v-textarea
            v-model="about"
            row-height="300"
            height="220"
            outlined
            hide-details
          ></v-textarea>
          <!-- <span class="font-weight-bold" style="overflow: auto">
            {{ user.about }}
          </span> -->
        </div>
      </v-col>
    </v-card>
    <div class="mt-5 d-flex justify-center align-center">
      <v-btn
        class="pl-10 pr-10 pink white--text"
        @click="updateProfile"
        x-large
      >
        프로필 수정
      </v-btn>
    </div>
    <div style="height: 300px"></div>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        job: '',
        location: '',
        about: '',
      };
    },
    methods: {
      updateProfile() {
        this.$store
          .dispatch('users/updateProfile', {
            userId: this.user.id,
            job: this.job,
            location: this.location,
            about: this.about,
          })
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    computed: {
      user() {
        return { ...this.$store.state.users.me };
      },
    },
    mounted() {
      this.job = this.user.job;
      this.location = this.user.location;
      this.about = this.user.about;
    },
  };
</script>

<style lang="scss" scoped>
  .registed_date {
    display: flex;
    align-items: flex-end;
  }
</style>
