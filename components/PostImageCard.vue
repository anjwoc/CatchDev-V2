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
    <v-img height="200" :src="post.coverImg" style="border-radius: 5px">
    </v-img>

    <div class="flex-item pa-4" style="font-size: 12px">
      <div class="caption font-weight-black">
        {{ post.category }}
      </div>
      <div class="black--text mt-1 font-weight-bold" style="font-size: 15px">
        {{ post.title }}
      </div>
      <div class="d-flex mt-6" style="font-size: 12px">
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
    </div>
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
    computed: {
      // coverImg() {
      //   if (this.post) {
      //     return this.post.coverImg
      //       ? this.post.coverImg
      //       : process.env.default_cover;
      //   }
      //   return process.env.default_cover;
      // },
    },
  };
</script>

<style lang="scss" scoped></style>
