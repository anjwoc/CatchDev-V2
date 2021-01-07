<template>
  <v-container class="title_form">
    <div class="title_box">
      <h3>스터디 등록</h3>
      <div class="steps">
        <li class="pink--text font-weight-bold">
          <b>02</b>
          추가정보
        </li>
        <img src="/icon_next.png" alt="" />
      </div>
    </div>
    <v-form ref="form" @submit.prevent="onSubmitForm">
      <div
        class="box"
        v-for="fieldIdx in qFieldNumbers.length"
        :key="'field-' + fieldIdx"
      >
        <div class="box-title">
          <div class="d-flex">
            <span class="mt-1">{{ questions[fieldIdx - 1] }}</span>
            <v-btn icon color="pink" @click="addTextField(fieldIdx - 1)">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="content">
          <v-card class="pa-4" outlined>
            <div
              v-for="i in qFieldNumbers[fieldIdx - 1]"
              :key="i"
              class="d-flex"
              style="justify-content: center; align-items: center"
            >
              <div class="vertical-center">✔️</div>
              <v-text-field
                v-model="qFields[fieldIdx - 1][i - 1]"
                class="my-1 pa-2"
                hide-details
                dense
              ></v-text-field>
              <v-btn
                class="vertical-center"
                @click="removeTextField(fieldIdx - 1, i - 1)"
                color="pink"
                x-small
                icon
              >
                <v-icon>mdi-minus-circle</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <span>게시글 본문</span>
          <b class="pink--text font-weight-black">*</b>
        </div>

        <div>
          <ClientOnly>
            <tiptap-vuetify
              v-model="content"
              :extensions="extensions"
              style="width: 100%"
            />
            <template #placeholder>
              <v-progress-circular
                indeterminate
                color="main"
              ></v-progress-circular>
            </template>
          </ClientOnly>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>해시태그</span>
        </div>

        <div class="content vertical-center">
          <vue-input-tag v-model="hashtags" class="hashtag" />
        </div>
      </div>
    </v-form>

    <div class="pa-6 mt-10">
      <v-row justify="center">
        <v-btn
          class="pl-10 pr-10 mr-4 grey darken-2 white--text"
          x-large
          to="/write/step1"
        >
          돌아가기
        </v-btn>
        <v-btn
          class="pl-10 pr-10 pink white--text"
          @click="onSubmitForm"
          x-large
        >
          게시하기
        </v-btn>
      </v-row>
    </div>
    <div style="height: 400px"></div>
  </v-container>
</template>

<script>
  import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    Strike,
    Underline,
    Code,
    Paragraph,
    BulletList,
    OrderedList,
    ListItem,
    Link,
    Blockquote,
    HardBreak,
    HorizontalRule,
    History,
    Image,
  } from "tiptap-vuetify";
  export default {
    components: {
      TiptapVuetify,
    },
    data() {
      return {
        files: null,
        questions: [
          "어떤 스터디인가요?",
          "스터디는 이렇게 진행됩니다.",
          "이런 분들과 함께 하고싶어요!",
        ],
        qFieldNumbers: [1, 1, 1],
        qFields: [[], [], []],
        content: "",
        hashtags: [],
        extensions: [
          History,
          Blockquote,
          Link,
          Underline,
          Strike,
          Italic,
          ListItem,
          BulletList,
          OrderedList,
          [
            Heading,
            {
              options: {
                levels: [1, 2, 3],
              },
            },
          ],
          Bold,
          Link,
          Code,
          HorizontalRule,
          Paragraph,
          HardBreak,
          Image,
        ],
      };
    },
    methods: {
      validate() {
        if (!this.content) {
          this.$dialog.notify.warning("본문을 입력해주세요", {
            position: "top-right",
            timeout: 5000,
          });
          return false;
        }
        return true;
      },
      addTextField(fieldIdx) {
        this.qFieldNumbers[fieldIdx] += 1;
        this.qFields[fieldIdx].push([]);
      },
      removeTextField(fieldIdx, idx) {
        this.qFieldNumbers[fieldIdx] -= 1;
        this.qFields[fieldIdx].splice(idx, 1);
      },
      onSubmitForm() {
        if (!this.validate()) return;
        const data = {};
        const length = this.qFields.length;
        for (let i = 0; i < length; i++) {
          data[this.questions[i]] = [...this.qFields[i]];
        }

        const payload = {
          ...this.writingPost,
          content: this.content,
          hashtags: this.hashtags,
          questions: data,
        };
        console.log(payload);
        this.$store
          .dispatch("posts/add", payload)
          .then(postId => {
            this.content = "";
            this.$router.push({ path: `/post/${postId}` });
            this.$store.commit("posts/setWritingPost", null);
          })
          .catch(err => {
            console.erorr(err);
          });
      },
    },
    computed: {
      writingPost() {
        return this.$store.state.posts.writingPost;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .hashtag {
    width: 100%;
    border-radius: 5px;
    border-color: rgba(0, 0, 0, 0.3);
    &:hover {
      border-color: rgba(0, 0, 0, 0.87);
    }
  }

  .title_form {
    width: 1185px;
    margin: 0 auto;
    padding-bottom: 100px;
    div {
      box-sizing: border-box;
    }
    .box {
      display: flex;
      padding: 30px 0;
      row-gap: 2px;
      border-bottom: 1px solid #d8d9db;
      .box-title {
        justify-content: center;
        width: 300px;
        color: #333;
        font-size: 18px;
        font-family: "Noto Sans KR", sans-serif !important;
        padding: 14px;
        font-weight: 900 !important;
      }
      .content {
        width: 70%;
      }
    }
  }
</style>
