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
      <div class="box">
        <div class="box-title">
          <div class="d-flex">
            <span class="mt-1">어떤 분에게 적합할까요?</span>
            <v-btn icon color="pink" @click="onAddTextField('addInfo-1')">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
        </div>
        <div ref="addInfo-1" class="content">
          <v-card class="pa-4" outlined>
            <div class="d-flex" style="justify-content: center">
              <div class="vertical-center">✔️</div>
              <v-text-field class="my-1 pa-2" hide-details dense></v-text-field>
            </div>
            <div class="d-flex" style="justify-content: center">
              <div class="vertical-center">✔️</div>
              <v-text-field class="my-1 pa-2" hide-details dense></v-text-field>
            </div>
          </v-card>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디등록지역</span>
          <b class="pink--text font-weight-black">*</b>
        </div>
        <div class="content">
          <v-select
            full-wdith
            hide-details
            :items="locations"
            outlined
          ></v-select>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디 방식</span>
          <b class="pink--text font-weight-black">*</b>
        </div>
        <div class="content">
          <v-radio-group row>
            <v-radio label="온라인" value="온라인"></v-radio>
            <v-radio label="오프라인" value="오프라인"></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디 제목</span>
          <b class="pink--text font-weight-black">*</b>
        </div>

        <div class="content">
          <v-text-field class="my-1" hide-details dense outlined></v-text-field>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>게시글 본문</span>
          <b class="pink--text font-weight-black">*</b>
        </div>

        <div>
          <ClientOnly>
            <tiptap-vuetify :extensions="extensions" style="width: 100%" />
            <template #placeholder>
              <v-progress-circular
                indeterminate
                color="main"
              ></v-progress-circular>
            </template>
          </ClientOnly>
        </div>
      </div>
    </v-form>

    <div class="pa-6 mt-10">
      <v-row justify="center">
        <v-btn
          class="pl-10 pr-10 mr-4 grey darken-2 white--text"
          x-large
          to="/"
        >
          돌아가기
        </v-btn>
        <v-btn class="pl-10 pr-10 pink white--text" x-large> 게시하기 </v-btn>
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
  } from 'tiptap-vuetify';
  import Vue from 'vue';
  import CustomTextField from '@/components/CustomTextField';
  export default {
    components: {
      TiptapVuetify,
      CustomTextField,
    },
    data() {
      return {
        files: null,
        // imageRules: [
        //   value =>
        //     !value ||
        //     value.size < 30000000 ||
        //     'image size should be less than 3 MB!',
        // ],
        categorys: ['어학', '취업', '고시', '자격증', '프로그래밍', '기타'],
        locations: [
          '서울',
          '수원',
          '인천',
          '부산',
          '강원',
          '천안',
          '울산',
          '광주',
          '제주',
          '기타',
        ],
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
      onAddTextField(e) {},
    },
    computed: {},
  };
</script>

<style lang="scss" scoped>
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
        font-family: 'Noto Sans KR', sans-serif !important;
        padding: 14px;
        font-weight: 900 !important;
      }
      .content {
        width: 70%;
      }
    }
  }
</style>
