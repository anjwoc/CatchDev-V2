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

        <v-menu offset-x>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small class="ml-2 mt-0 pb-2" v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item-group>
              <v-list-item :to="`/write/${post.id}`">
                <v-list-item-content class="font-weight-bold">
                  수정하기
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content
                  @click="onDeletePost"
                  class="font-weight-bold"
                >
                  삭제하기
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-menu>
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
      <v-card class="flex-container pa-0" height="485" elevation="0">
        <h2>관련 스터디</h2>
        <!-- 해시태그가 겹치는 다른 게시글 전부 불러오기 -->
        <div>
          <related-post-list :relatedPosts="relatedPosts"></related-post-list>
        </div>
        <div class="flex_item">
          <div class="d-flex justify-space-between">
            <v-btn
              outlined
              small
              style="height: 44px"
              elevation="0"
              color="grey lighten-2"
              @click="onClickHeart"
            >
              <v-icon color="pink lighten-1"> {{ heartIcon }} </v-icon>
            </v-btn>
            <v-btn
              class="white--text"
              large
              style="width: 80%"
              elevation="0"
              color="pink lighten-1"
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
  import RelatedPostList from '@/components/RelatedPostList';
  export default {
    props: {
      post: {
        type: Object,
        required: true,
      },
      relatedPosts: [Object, Array],
      me: [Object, String],
    },
    component: {
      RelatedPostList,
    },
    data() {
      return {
        menuItems: [
          { name: '수정하기', to: `/write/${this.post.id}` },
          { name: '삭제하기' },
        ],
      };
    },
    methods: {
      onDeletePost() {
        const hashtags = [];
        if (this.post && this.post.hashtags) {
          hashtags.unshift(this.post.hashtags.map(tag => tag.name));
        }

        console.log(hashtags);
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
      liked() {
        const me = this.me;
        return !!(this.post.Likers || []).find(v => v.id === (me && me.id));
      },
      heartIcon() {
        return this.liked ? 'mdi-heart' : 'mdi-heart-outline';
      },
      hashtags() {
        if (this.post && this.post.hashtags) {
          const tags = [];
          tags.unshift(this.post.hashtags.map(tag => tag.name));
          return tags[0];
        }
        return null;
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
