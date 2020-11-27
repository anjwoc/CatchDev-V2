<template>
  <div>
    <div>
      <v-icon large color="red lighten-2 mr-0">mdi-message-text</v-icon>
      <span class="font-weight-bold subtitle1">{{ numComments }}</span>
    </div>
    <v-form
      ref="form"
      v-model="valid"
      style="position: relative"
      @submit.prevent="onSubmitForm"
    >
      <v-textarea
        class="main-form"
        v-model="content"
        color="black"
        placeholder="댓글을 입력해주세요."
        outlined
        clearable
        no-resize
        hide-details
      />
      <div class="ma-0 pa-0 d-flex justify-space-between vertical-center">
        <div class="pb-4">
          <v-checkbox
            v-model="isPrivate"
            label="Private Comment"
            color="indigo darken-3"
            :value="true"
            hide-details
          ></v-checkbox>
          <div class="caption grey--text">본인, 작성자만 확인 가능</div>
        </div>
        <v-btn class="font-weight-bold" color="pink" large dark type="submit">
          작성하기
        </v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
  export default {
    props: {
      postId: {
        type: Number,
        required: true,
      },
      numComments: [Number],
    },
    data() {
      return {
        valid: false,
        content: '',
        hideDetails: true,
        isPrivate: false,
      };
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    methods: {
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store
            .dispatch('posts/addComment', {
              postId: this.postId,
              content: this.content,
              isPrivate: this.isPrivate,
            })
            .then(() => {
              this.content = '';
            });
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .main-comment {
    max-height: 300px;
  }
  .main-form {
    &:focus {
      outline: none !important;
      border: none !important;
    }
  }
</style>
