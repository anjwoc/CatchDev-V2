<template>
  <v-container>
    <div v-if="post">
      <post-page :post="post" :me="me" :relatedPosts="relatedPosts"></post-page>
    </div>
  </v-container>
</template>

<script>
  import PostPage from '@/components/PostPage';
  import { mapState } from 'vuex';
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
      ...mapState({
        post: state => state.posts.mainPosts[0],
        me: state => state.users.me,
        relatedPosts: state => state.posts.relatedPosts,
      }),
    },
  };
</script>

<style lang="scss" scoped></style>
