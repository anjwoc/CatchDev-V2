<template>
  <v-card
    :elevation="hover ? 10 : 1"
    :ripple="false"
    nuxt
    link
    :to="`/post/${post.id}`"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <!-- <v-img height="200" :src="coverImg" style="border-radius: 5px"> </v-img> -->
    <v-card-title class="mb-0 pb-0"> 🏤 </v-card-title>
    <v-card-title class="mt-1 pt-0 font-weight-bold">
      <div>구성원 인사정보</div>
    </v-card-title>
    <v-card-text class="ma-0 pb-0"><v-divider /></v-card-text>
    <v-card-text class="caption grey--text text--lighten--3">
      전체 구서우언의 인사정보를 다운로드합니다. 입사 예정이거나 이미 퇴직한
      구성원의 정보는 포함되지 않습니다.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {},
    computed: {},
  };
</script>

<style lang="scss" scoped>
  .emoji {
    font-size: 16px;
  }
</style>
