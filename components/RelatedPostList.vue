<template>
  <v-card elevation="0" class="mx-auto" tile>
    <v-list class="related_posts_list" dense>
      <!-- <v-subheader>Related Posts</v-subheader> -->
      <v-list-item-group v-model="selectedPost" no-action>
        <template v-for="(post, idx) in relatedPosts">
          <v-list-item
            class="related_posts_list_item ma-1"
            :key="idx"
            :to="`/post/${post.id}`"
          >
            <v-list-item-icon>
              <v-icon class="white--text">mdi-link-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-content
              class="related_posts_list_content white--text"
              v-text="post.title"
            ></v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    props: {
      relatedPosts: [Object, Array],
    },

    data() {
      return {
        selectedPost: '',
      };
    },
    methods: {},
  };
</script>

<style lang="scss" scoped>
  .related_posts_list {
    max-height: 22rem;
    overflow-y: scroll;
  }
  .related_posts_list::-webkit-scrollbar {
    width: 10px;
  }

  .related_posts_list::-webkit-scrollbar-thumb {
    background-color: #e91e63;
    opacity: 0.3;
    border-radius: 10px;
    background-clip: padding-box;
    border: 3px solid transparent;
  }
  .related_posts_list::-webkit-scrollbar-track {
    // background-color: grey;
    // border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
  .related_posts_list_content {
    font-size: 14px;
    font-weight: 400;
  }
  .related_posts_list_item {
    // background-color: #e91e63;
    // opacity: 0.4;
    // background-color: #66a4e0;

    // background-color: #f2709c;

    background-color: #f2709c;
    border-radius: 5px;
  }
</style>
