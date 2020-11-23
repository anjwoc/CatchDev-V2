<template>
  <v-card
    :elevation="hover ? 10 : 2"
    :ripple="false"
    height="300"
    width="300"
    :to="card.to"
    nuxt
    link
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <!-- <v-img height="200" :src="coverImg" style="border-radius: 5px"> </v-img> -->
    <v-card-title class="mb-0 pb-0"> {{ card.emoji }} </v-card-title>
    <v-card-title class="mt-1 pt-0 font-weight-bold">
      <div>{{ card.title }}</div>
    </v-card-title>
    <v-card-text class="ma-0 pb-0"><v-divider /></v-card-text>
    <v-card-text class="caption grey--text text--lighten--3">
      {{ card.text }}
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      hover: [Boolean],
      card: [Object],
    },
    computed: {},
  };
</script>

<style lang="scss" scoped>
  .emoji {
    font-size: 16px;
  }
</style>
