<template>
  <v-container>
    <v-card elevation="0">
      <h1>{{ post.title }}</h1>
      <div class="d-flex mt-3">
        <v-avatar class="mr-2 mb-8" size="40">
          <img
            :src="post.user && post.user.imgSrc"
            refererpolicy="no-referrer"
          />
        </v-avatar>
        <div style="dispaly: inline-block">
          <div class="caption ma-0 pa-0">{{ post.user.email }}</div>
          <div class="caption heart">{{ post.like }}</div>
        </div>
      </div>
    </v-card>
    <div class="post_content_container">
      <v-img
        class="mb-5"
        contain
        max-height="442"
        :src="cover"
        style="border-radius: 10px"
      ></v-img>

      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>분야</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            {{ post.category }}
          </v-card>
        </v-col>
      </v-row>
      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>등록지역</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            {{ post.location }}
          </v-card>
        </v-col>
      </v-row>
      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>운영 방식</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            {{ post.type }}
          </v-card>
        </v-col>
      </v-row>

      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>참여 인원</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            <div>{{ post.numPeople }}명</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>스터디 제목</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            <div>{{ post.title }}</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>본문</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 bg-info pa-4" elevation="0">
            <div v-html="post.content"></div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="info-section">
        <v-col class="info-card" cols="2">
          <h3>해시태그</h3>
        </v-col>
        <v-col cols="10">
          <v-card class="subtitle-1 pt-2 pb-2" elevation="0">
            <v-chip
              v-for="tag in post.hashtags"
              :key="tag.name"
              class="mr-1 font-weight-regular"
              color="grey lighten-4"
              text-color="blue-grey"
            >
              {{ tag.name }}
            </v-chip>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-card class="mt-3 pa-5 post_sticky_area" elevation="1">
      <v-card class="flex-container" height="485" elevation="0">
        <h2>관련 스터디</h2>
        <!-- 해시태그가 겹치는 다른 게시글 전부 불러오기 -->
        <div class="flex_item">
          <div class="d-flex justify-space-between">
            <v-btn
              outlined
              small
              style="height: 44px"
              elevation="0"
              color="grey lighten-2"
            >
              <v-icon color="pink"> mdi-heart-outline </v-icon>
            </v-btn>
            <v-btn
              class="white--text"
              large
              style="width: 80%"
              elevation="0"
              color="pink"
            >
              스터디 참여하기
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
      me: [Object, String],
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
            this.$router.push({ path: '/' });
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
      cover() {
        return process.env.default_cover;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .flex-container {
    display: flex;
    flex-direction: column;
  }
  .flex_item {
    margin-top: auto;
  }
</style>
