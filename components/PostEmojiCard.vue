<template>
  <v-card
    class="flex-container"
    :elevation="hover ? 10 : 1"
    :ripple="false"
    :to="`/post/${post.id}`"
    height="322"
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
    <v-card-title class="mb-0 pb-0"> 🏤 </v-card-title>
    <v-card-title class="mt-1 pt-0 font-weight-bold">
      <div>{{ post.title }}</div>
    </v-card-title>
    <v-card-text class="ma-0 pb-0"><v-divider /></v-card-text>
    <v-card-text class="caption grey--text text--lighten--3">
      {{ cardContent }}
    </v-card-text>
    <!-- <v-card-text class="ma-0 pb-0"><v-divider /></v-card-text> -->
    <div class="flex-item pa-4" style="font-size: 12px">
      <span class="user mr-1"></span>
      <div class="caption caption--text">{{ post.numPeople }}명 정원</div>
      <div class="ml-1 mr-1"></div>

      <div class="heart"></div>
      <div class="caption">{{ post.like }}</div>
      <div class="ml-1 mr-1"></div>

      <div class="caption font-weight-bold">
        {{ post.location }}
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    props: {
      height: [String, Number],
      post: {
        type: Object,
      },
      hover: {
        type: Boolean,
      },
    },
    computed: {
      cardContent() {
        const content = this.post.content.slice(0, 50);
        const result = content.replace(/(<([^>]+)>)/gi, '') + '...';
        return result;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .emoji {
    font-size: 16px;
  }
  .flex-container {
    display: flex;
    flex-direction: column;
  }
  .flex-item {
    display: flex;
    margin-top: auto;
    bottom: 0;
  }
</style>
