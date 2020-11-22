<template>
  <div>
    <post-image-card
      v-if="post.coverImg"
      :height="height"
      :post="post"
      :hover="hover"
    />
    <post-emoji-card v-else :height="height" :post="post" :hover="hover" />
  </div>
</template>

<script>
  import PostImageCard from '@/components/PostImageCard';
  import PostEmojiCard from '@/components/PostEmojiCard';
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
