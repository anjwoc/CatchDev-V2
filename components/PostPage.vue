<template>
  <v-container>
    <h1 id="mainTitle" style="font-size: 3.2rem">{{ post.title }}</h1>
    <div>
      <v-avatar class="mr-2 mb-8" size="60">
        <v-img
          :src="this.post.user && this.post.user.imgSrc"
          :lazy-src="this.post.user && this.post.user.imgSrc"
        ></v-img>
      </v-avatar>
      <div style="display: inline-block">
        <p class="ma-0 pa-0 title font-weight-black">email</p>
        <p class="ma-0 pa-0 subtitle-2" style="opacity: 0.5">
          {{ post.user && post.user.about }}
        </p>
      </div>
    </div>

    <v-row>
      <div v-html="post.content"></div>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    middleware({store, params}) {
      return Promise.all([store.dispatch('posts/loadPost', params.id)]);
    },
    props: {
      post: {
        type: Object,
        required: true,
      },
      me: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {};
    },
    methods: {
      onDeletePost() {
        this.$store
          .dispatch('posts/remove', {
            postId: this.post.id,
            hashtags: this.hashtags,
          })
          .then(res => {
            this.$router.push({path: '/'});
          });
      },
      onUpdateStatus() {
        this.$store
          .dispatch('posts/updatePostStatus', {
            postId: this.post.id,
            status: this.post.status,
          })
          .then(res => {
            this.$router.push('/');
          });
      },
      onClickHeart() {
        if (!this.me) {
          return alert('로그인이 필요합니다');
        }
        if (this.liked) {
          return this.$store.dispatch('posts/unlikePost', {
            postId: this.post.id,
          });
        }
        return this.$store.dispatch('posts/likePost', {
          postId: this.post.id,
        });
      },
    },
    computed: {
      post() {
        return this.$store.state.posts.mainPosts.find(
          v => v.id === parseInt(this.$route.params.id, 10),
        );
      },
      isMe() {
        return this.post.user.id === this.me.id;
      },
      hashtags() {
        if (this.post && this.post.hashtags) {
          const tags = [];
          tags.unshift(this.post.hashtags.map(tag => tag.name));
          return tags[0];
        }
        return null;
      },
      updateLink() {
        return `/write/${this.post.id}`;
      },
    },
  };
</script>

<style lang="scss" scoped></style>
