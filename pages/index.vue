<template>
  <div>
    <div>
      <v-carousel
        cycle
        height="300"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
              <!-- <v-img src="/c-logo.png" contain cover></v-img> -->
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-container>
      <div class="text-center justify-center mt-6 mb-6">
        <div class="text-h5 font-weight-bold">최근 게시글</div>
      </div>
      <v-row>
        <v-col v-for="post in mainPosts" :key="post.id" md="4" sm="6" xs="12">
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
  </div>
</template>

<script>
  import PostCard from '@/components/common/PostCard';
  import { mapState } from 'vuex';
  export default {
    middleware({ store, redirect }) {
      return store.dispatch('posts/loadPosts', { reset: true });
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
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      };
    },
    methods: {
      onScroll() {
        if (
          window.scrollY + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 300 &&
          this.hasMorePost
        ) {
          this.$store.dispatch('posts/loadPosts');
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
