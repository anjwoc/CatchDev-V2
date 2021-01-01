<template>
  <v-container>
    <div class="post_content_container mt-4">
      <v-img
        v-if="post.coverImg"
        class="mb-5"
        contain
        max-height="442"
        :src="post.coverImg"
        style="border-radius: 10px"
      ></v-img>
      <h1 v-else>📂</h1>

      <v-card class="subtitle-1 pb-4 mt-6" elevation="0">
        <v-chip
          v-for="tag in [
            post.category,
            post.location,
            post.type,
            post.numPeople,
          ]"
          :key="tag"
          small
          label
          outlined
          class="mr-1 font-weight-regular"
          color="grey lighten-4"
          text-color="black"
        >
          {{ tag }}
        </v-chip>
      </v-card>

      <v-card elevation="0">
        <h2>{{ post.title }}</h2>
        <div class="d-flex mt-3">
          <v-avatar class="mr-2" size="40">
            <v-img
              :src="post.user && post.user.imgSrc"
              :lazy-src="post.user && post.user.imgSrc"
              refererpolicy="no-referrer"
            />
          </v-avatar>
          <div style="dispaly: inline-block">
            <div class="caption ma-0 pa-0">{{ post.user.email }}</div>
            <div class="caption heart">{{ post.like }}</div>
          </div>

          <v-menu v-if="isMe" offset-x rounded elevation="1">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon small class="ml-2 mt-0 pb-2" v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group>
                <v-list-item @click="updatePost">
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

      <v-card class="subtitle-1 pb-4 mt-6" elevation="0">
        <v-chip
          v-for="tag in post.hashtags"
          :key="tag.name"
          class="mr-1 font-weight-regular"
          color="grey lighten-4"
          text-color="black"
          small
        >
          {{ tag.name }}
        </v-chip>
      </v-card>

      <v-row
        v-for="(answers, name) in post.questions"
        :key="name"
        class="info-section"
      >
        <v-col class="info-card" cols="4">
          <h3>{{ name }}</h3>
        </v-col>
        <v-col cols="8">
          <v-card class="subtitle-1 pa-4" outlined elevation="0">
            <div
              class="d-flex pt-1 pb-1 mb-2"
              v-for="ans in answers"
              :key="ans"
            >
              <div class="vertical-center mr-4">✔️</div>
              <div class="">{{ ans }}</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10 mb-6 pa-4">
        <div v-html="post.content"></div>
      </v-row>
      <comment-form
        class="mb-6"
        :postId="post.id"
        :numComments="post.numComments"
      />
      <v-divider></v-divider>
      <comment-content
        :comments="post.Comments"
        :postId="post.id"
        :postCreatedAt="post.createdAt"
      ></comment-content>
    </div>
    <v-card class="pa-5 post_sticky_area" elevation="1">
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
              style="height: 44px; width: 100%"
              elevation="0"
              color="grey lighten-2"
              @click="onClickHeart"
            >
              <v-icon color="pink lighten-1"> {{ heartIcon }} </v-icon>
            </v-btn>
            <!-- <v-btn
              class="white--text"
              large
              style="width: 80%"
              elevation="0"
              color="pink lighten-1"
              @click="onApplySutdy"
            >
              스터디 참여하기
            </v-btn> -->
          </div>
        </div>
      </v-card>
    </v-card>
  </v-container>
</template>

<script>
  import RelatedPostList from "@/components/RelatedPostList";
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
        menuItems: [{ name: "수정하기" }, { name: "삭제하기" }],
      };
    },
    methods: {
      updatePost() {
        this.$store.commit("posts/setWritingPost", {
          id: this.post.id,
          category: this.post.category,
          content: this.post.content,
          coverImg: this.post.coverImg,
          hashtags: this.post.hashtags,
          location: this.post.location,
          numPeople: this.post.numPeople,
          questions: this.post.questions,
          title: this.post.title,
          type: this.post.type,
        });
        this.$router.push(`/write/update/step1`);
      },
      onDeletePost() {
        const hashtags = [];
        if (this.post && this.post.hashtags) {
          hashtags.unshift(this.post.hashtags.map(tag => tag.name));
        }

        this.$store
          .dispatch("posts/remove", {
            postId: this.post.id,
            hashtags: this.hashtags,
          })
          .then(res => {
            this.$router.push({ path: "/" });
          });
      },
      onUpdateStatus() {
        this.$store
          .dispatch("posts/updatePostStatus", {
            postId: this.post.id,
            status: this.post.status,
          })
          .then(res => {
            this.$router.push("/");
          });
      },
      onClickHeart() {
        if (!this.me) {
          return alert("로그인이 필요합니다");
        }
        if (this.liked) {
          return this.$store.dispatch("posts/unlikePost", {
            postId: this.post.id,
          });
        }
        return this.$store.dispatch("posts/likePost", {
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
        return this.liked ? "mdi-heart" : "mdi-heart-outline";
      },
      hashtags() {
        if (this.post && this.post.hashtags) {
          const tags = [];
          tags.unshift(this.post.hashtags.map(tag => tag.name));
          return tags[0];
        }
        return null;
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
