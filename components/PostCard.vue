<template>
  <component
    :is="card"
    :height="height"
    :post="post"
    :hover="hover"
  ></component>
</template>

<script>
  import PostImageCard from '@/components/PostImageCard';
  import PostEmojiCard from '@/components/PostEmojiCard';
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
    components: {
      PostEmojiCard,
      PostImageCard,
    },
    data() {
      return {
        card: '',
      };
    },
    mounted() {
      if (this.post.coverImg) {
        this.card = 'PostImageCard';
        return;
      }
      this.card = 'PostEmojiCard';
    },
  };
</script>

<style lang="scss" scoped></style>
