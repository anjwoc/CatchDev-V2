<template>
  <v-container>
    <div v-if="post">
      <post-page :post="post" :me="me"></post-page>
    </div>
  </v-container>
</template>

<script>
  import PostPage from '@/components/PostPage';
  export default {
    layout: 'post',
    components: {
      PostPage,
    },
    middleware({ store, params }) {
      return Promise.all([
        store.dispatch('posts/loadPost', params.id),
        store.dispatch('posts/loadComments', params.id),
      ]);
    },
    data() {
      return {};
    },
    methods: {},
    computed: {
      post() {
        return this.$store.state.posts.mainPosts[0];
      },
      me() {
        return this.$store.state.users.me;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
