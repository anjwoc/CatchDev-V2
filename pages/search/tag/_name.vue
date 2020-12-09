<template>
  <v-container>
    <div class="text-center justify-center mt-6 mb-6">
      <div class="text-h5 font-weight-bold">검색 결과</div>
    </div>
    <v-row>
      <v-col
        v-for="post in mainPosts"
        :key="post.id"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <v-hover
          v-slot:default="{ hover }"
          :open-delay="openDelay"
          :close-delay="closeDelay"
          :disabled="disabled"
          :value="value"
        >
          <post-card :hover="hover" :post="post" height="200"></post-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import PostCard from '@/components/PostCard';
  import { mapState } from 'vuex';
  export default {
    layout: 'main',
    middleware({ store, redirect, params }) {
      return store.dispatch('posts/loadTagsPosts', {
        reset: true,
        tag: params.name,
      });
    },
    components: {
      PostCard,
    },
    data() {
      return {
        disabled: false,
        openDelay: '0',
        closeDelay: '0',
        value: false,
      };
    },
    methods: {
      onScroll() {
        if (
          window.scrollY + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 300 &&
          this.hasMorePost
        ) {
          this.$store.dispatch('posts/loadTagsPosts');
        }
      },
    },
    computed: {
      ...mapState({
        me: state => state.users.me,
        hasMorePost: state => state.posts.hasMorePost,
        mainPosts: state => state.posts.mainPosts,
      }),
    },
    mounted() {
      window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.onScroll);
    },
  };
</script>
<style scoped></style>
