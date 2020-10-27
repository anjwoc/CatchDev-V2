<template>
  <v-card :elevation="hover ? 13 : 2" :ripple="false">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-img height="200" :src="coverImg">
      <!-- src="https://cdn.vuetifyjs.com/images/cards/cooking.png" -->
    </v-img>
    <v-btn class="position-absolute-top-right mt-1 mr-1" icon>
      <v-avatar size="35" class="white">
        <v-icon color="pink">mdi-heart-outline</v-icon>
      </v-avatar>
    </v-btn>

    <v-card-text>
      <!-- <div class="caption">{{ post.category }}</div> -->
      <div class="caption">웹 개발</div>
      <div class="black--text mt-1 font-weight-bold" style="font-size: 15px">
        <!-- {{ post.title }} -->
        리액트
      </div>
      <div class="d-flex mt-6" style="font-size: 12px">
        <span class="user"></span>
        <!-- <div class="caption">{{ post.numPeople }}명 참여</div> -->
        <div class="caption">12명 참여</div>
        <div>•</div>
        <span class="star"></span>
        <div class="caption">5(41)</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      height: [String, Number],
      post: {
        type: Object,
        // required: true,
      },
      hover: {
        type: Boolean,
        // required: true,
      },
    },
    data() {
      return {};
    },
    methods: {},
    computed: {
      coverImg() {
        if (this.post) {
          return this.post.coverImg
            ? this.post.coverImg
            : process.env.default_cover;
        }
        return process.env.default_cover;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
