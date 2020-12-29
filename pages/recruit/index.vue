<template>
  <div>
    <v-container>
      <div class="text-h5 study_search_title">스터디 상세 검색</div>
      <v-card class="study_search_box pa-4" width="100%" elevation="1">
        <v-row>
          <v-col class="vertical-center" cols="5">
            <v-icon x-large>mdi-magnify</v-icon>
            <input v-model="word" type="text" placeholder="검색어" />
          </v-col>
          <v-col class="vertical-center" cols="6">
            <v-icon x-large>mdi-map-marker</v-icon>
            <v-select
              class="location_list elevation-0"
              v-model="location"
              :items="locations"
              flat
              solo
              label="지역"
              hide-details
            ></v-select>
          </v-col>
          <v-col cols="1">
            <v-btn
              class="vertical-center"
              @click="onSearchPosts"
              fab
              color="pink"
              dark
              outlined
            >
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <v-container>
      <div class="text-h5 hashtag_title">
        <v-icon class="pb-1">mdi-tag</v-icon>
        <span>추천 해시태그</span>
        <v-icon x-small>mdi-infomation</v-icon>
      </div>
      <div class="d-flex">
        <v-chip-group v-model="tags" multiple active-class="pink--text">
          <v-chip v-for="tag in hashtags" class="" :key="tag" outlined label>
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </div>
    </v-container>

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
  </div>
</template>

<script>
  import PostCard from "@/components/PostCard";
  import { mapState } from "vuex";
  export default {
    middleware({ store, redirect }) {
      return Promise.all([
        store.dispatch("posts/loadPosts", { reset: true }),
        store.dispatch("posts/loadHashtags"),
      ]);
    },
    components: {
      PostCard,
    },
    data() {
      return {
        disabled: false,
        openDelay: "0",
        closeDelay: "0",
        value: false,
        tags: [],
        word: "",
        location: "",
        locations: [
          "",
          "서울",
          "수원",
          "인천",
          "부산",
          "강원",
          "천안",
          "울산",
          "광주",
          "제주",
          "기타",
        ],
      };
    },
    methods: {
      onSearchPosts() {
        const selectedTags = this.tags.map(idx => this.hashtags[idx]);
        this.$store.dispatch("posts/loadSearchPosts", {
          reset: true,
          word: this.word,
          location: this.location,
          tags: selectedTags,
        });
      },
      onScroll() {
        if (
          window.scrollY + document.documentElement.clientHeight >
            document.documentElement.scrollHeight - 300 &&
          this.hasMorePost
        ) {
          this.$store.dispatch("posts/loadPosts");
        }
      },
    },
    computed: {
      ...mapState({
        me: state => state.users.me,
        hasMorePost: state => state.posts.hasMorePost,
        mainPosts: state => state.posts.mainPosts,
        hashtags: state => state.posts.hashtags,
      }),
    },
    mounted() {
      window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.onScroll);
    },
    head() {
      return {
        metaInfo: {
          title: "검색 결과",
          titleTemplate: "%s",
          // <html> 요소의 속성 설정
          htmlAttrs: {
            // 주 언어 명시
            lang: "ko-KR",
            dir: "ltr",
          },
          meta: [
            { charset: "utf-8" },
            { hid: "description", name: "description", content: "검색 결과" },
          ],
        },
      };
    },
  };
</script>
<style scoped>
  .study_search_title {
    margin-top: 4rem !important;
    margin-bottom: 2rem !important;
    /* padding-top: 100px;
    padding-bottom: 35px; */
    margin: 0;
    font-family: "Montserrat", sans-serif;
    font-size: 32px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.24;
    letter-spacing: -1.9px;
    text-align: left;
    color: #000000;
  }

  .hashtag_title {
    margin-top: 2.5rem;
    margin-bottom: 39px;
    height: 33px;
    font-family: "Montserrat", sans-serif;
    font-size: 28px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: -1.4px;
    text-align: left;
    color: #1f254b;
  }

  .study_search_box {
    box-shadow: 5px 7px 33px 0 rgba(0, 0, 0, 0.06) !important;
  }
  input {
    width: 100%;
    border: none;
    font-family: "Montserrat", sans-serif;
    /* font-size: 24px; */
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.21;
    letter-spacing: -1.2px;
    text-align: left;
    /* color: #666666; */
  }

  .location_list {
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
  }
</style>
