<template>
  <v-container class="title_form">
    <div class="title_box">
      <h3>스터디 등록</h3>
      <div class="steps">
        <li class="pink--text font-weight-bold">
          <b>01</b>
          기본정보
        </li>
        <img src="/icon_next.png" alt="" />
      </div>
    </div>
    <v-form ref="form" v-model="valid">
      <div class="box">
        <div class="box-title">
          <span>스터디분야</span>
          <b class="pink--text font-weight-black">*</b>
        </div>
        <div class="content">
          <v-select
            v-model="category"
            full-wdith
            hide-details
            :items="categorys"
            outlined
          ></v-select>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디등록지역</span>
          <b class="pink--text font-weight-black">*</b>
        </div>
        <div class="content">
          <v-select
            v-model="location"
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
          <v-radio-group v-model="studyType" row>
            <v-radio label="온라인" value="온라인"></v-radio>
            <v-radio label="오프라인" value="오프라인"></v-radio>
          </v-radio-group>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디 참여 인원</span>
          <b class="pink--text font-weight-black">*</b>
        </div>
        <div class="content">
          <v-select
            v-model="minPeople"
            hide-details
            :label="minPeople || '최소'"
            :items="Array.from({ length: 20 }, (_, i) => i + 1)"
            outlined
          ></v-select>
          <v-select
            v-model="maxPeople"
            hide-details
            :label="maxPeople || '최대'"
            :items="Array.from({ length: 20 }, (_, i) => i + 1)"
            outlined
          >
          </v-select>
        </div>
      </div>
      <div class="box">
        <div class="box-title">
          <span>스터디 제목</span>
          <b class="pink--text font-weight-black">*</b>
        </div>

        <div class="content">
          <v-text-field
            v-model="title"
            class="my-1"
            hide-details
            dense
            outlined
          ></v-text-field>
        </div>
      </div>

      <div class="box">
        <div class="box-title">
          <span>커버 이미지</span>
        </div>

        <div class="content">
          <v-file-input
            color="deep-purple accent-4"
            label="File input"
            placeholder="Select your files"
            prepend-icon="mdi-paperclip"
            outlined
            accept="image/png, image/jpeg, image/jpg"
          >
          </v-file-input>
          <div class="ml-9 details caption pink--text">
            커버 이미지를 등록하지 않으면 기본 이미지로 적용 됩니다.
          </div>
        </div>
      </div>
    </v-form>

    <div class="pa-6 mt-10">
      <v-row justify="center">
        <v-btn
          class="pl-10 pr-10 mr-4 grey darken-2 white--text"
          x-large
          :to="`/post/${writingPost.id}`"
        >
          돌아가기
        </v-btn>
        <v-btn class="pl-10 pr-10 pink white--text" x-large @click="toNextPage">
          다음 단계로
        </v-btn>
      </v-row>
    </div>
    <div style="height: 400px"></div>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: false,
        coverImagePath: '',
        files: [],
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
      };
    },
    methods: {
      uploadCoverImage() {
        if (this.files && this.files.length === 0) return;
        const formData = new FormData();
        // formData.append('postId', postId);
        formData.append('image', this.files[0]);
        this.$axios
          .post(`/post/thumbnail`, formData, {
            withCredentials: true,
          })
          .then(path => {
            this.coverImagePath = path.data;
          })
          .catch(err => {
            console.error(err);
          });
      },
      toNextPage() {
        if (this.$refs.form.validate()) {
          this.$router.push('/write/update/step2');
        }
      },
    },
    computed: {
      numPeople() {
        return this.minPeople + '-' + this.maxPeople;
      },
      coverImg() {
        return this.coverImagePath !== ''
          ? this.coverImagePath
          : process.env.default_cover;
      },
      writingPost() {
        return this.$store.state.posts.writingPost;
      },
    },
    created() {
      this.category = this.writingPost.category
        ? this.writingPost.category
        : '';
      this.location = this.writingPost.location
        ? this.writingPost.location
        : '';
      this.studyType = this.writingPost.studyType
        ? this.writingPost.studyType
        : '오프라인';
      [this.minPeople, this.maxPeople] = this.writingPost.numPeople
        ? this.writingPost.numPeople.split('-')
        : [0, 0];
      this.title = this.writingPost.title ? this.writingPost.title : '';
    },
  };
</script>

<style lang="scss" scoped></style>
