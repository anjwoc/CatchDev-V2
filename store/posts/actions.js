import throttle from 'lodash.throttle';

const actions = {
  add({ commit, state }, payload) {
    return this.$axios
      .post(
        '/post',
        {
          title: payload.title,
          content: payload.content,
          numPeople: payload.numPeople,
          type: payload.type,
          coverImg: payload.coverImg,
          hashtags: payload.hashtags,
          location: payload.location,
          category: payload.category,
          image: state.imagePaths,
          questions: payload.questions,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('addMainPost', res.data);
        return res.data.id;
      })
      .catch(err => {
        console.error(err);
      });
  },
  update({ commit, state }, payload) {
    return this.$axios
      .post(
        `/post/${payload.id}/update`,
        {
          title: payload.title,
          content: payload.content,
          hashtags: payload.hashtags,
          tagHistory: payload.tagHistory,
          location: payload.location,
          category: payload.category,
          image: state.imagePaths,
          questions: payload.questions,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('updateMainPost', res.data);
        return res.data.id;
      })
      .catch(err => {
        console.error(err);
      });
  },
  remove({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        withCredentials: true,
      })
      .then(res => {
        commit('removeMainPost', payload);
      })
      .catch(err => {
        console.error(err);
      });
  },

  async addComment({ commit }, payload) {
    await this.$axios
      .post(
        `/comment/${payload.postId}`,
        {
          postId: payload.postId,
          content: payload.content,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('addComment', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  async deleteComment({ commit }, payload) {
    await this.$axios
      .delete(
        `/comment/${payload.id}`,
        {
          data: {
            postId: payload.postId,
          },
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('deleteComment', {
          id: res.data,
          postId: payload.postId,
        });
      });
  },
  async updateComment({ commit }, payload) {
    await this.$axios
      .post(
        `/comment/update/${payload.commentId}`,
        {
          content: payload.content,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('updateComment', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  async loadPost({ dispatch, commit, state }, payload) {
    try {
      console.log('loadPost');
      const res = await this.$axios.get(`/post/${payload}`);
      const post = res.data;

      if (post.hashtags.length > 0) {
        let tags = '';
        post.hashtags.forEach(tag => {
          tags += `${tag.name},`;
        });
        tags = tags.slice(0, tags.length - 1);
        commit('loadPost', post);
        return dispatch('loadRelatedPosts', {
          tags: tags,
          postId: payload,
        });
      }
      commit('loadPost', post);
    } catch (err) {
      console.error(err);
    }
  },
  async loadRelatedPosts({ commit }, payload) {
    const res = await this.$axios.get(`/posts/tags?tags=${payload.tags}`);
    commit('loadRelatedPosts', {
      newPosts: res.data,
      currentPostId: payload.postId,
    });
  },
  async loadUpdatePost({ commit, state }, postId) {
    try {
      const res = await this.$axios.get(`/post/history/${postId}`);
      commit('loadPost', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async loadCategoryPosts({ commit, state }, payload) {
    try {
      let item = payload.item;
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts/categoryPosts?item=${item}`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(
          `/posts/categoryPosts?item=${item}&lastId=${
            lastPost && lastPost.id
          }&limit=10`,
        );
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  },
  loadTrendingPosts: throttle(async function ({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts/trendingPosts`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(
          `/posts?lastId=${lastPost && lastPost.id}&limit=10`,
        );
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  loadPosts: throttle(async function ({ commit, state }, payload) {
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.mainPosts[state.mainPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(
          `/posts?lastId=${lastPost && lastPost.id}&limit=10`,
        );
        commit('loadPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 500),
  loadTagsPosts: throttle(async function ({ commit }, payload) {
    if (payload && payload.reset) {
      const res = await this.$axios.get(`/posts/tags/${payload.name}`);
      commit('loadPosts', {
        data: res.data,
        reset: true,
      });
      return;
    }
    if (state.hasMorePost) {
      const lastPost = state.mainPosts[state.mainPosts.length - 1];
      const res = await this.$axios.get(
        `/posts/tags/${payload.name}?lastId=${
          lastPost && lastPost.id
        }&limit=10`,
      );
      commit('loadPosts', {
        data: res.data,
      });
      return;
    }
  }, 2000),

  async loadComments({ commit }, payload) {
    await this.$axios
      .get(`/comment/${payload}`)
      .then(res => {
        commit('loadComments', {
          postId: payload,
          data: res.data,
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  likePost({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/like`,
        {},
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('likePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  unlikePost({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}/like`, {
        withCredentials: true,
      })
      .then(res => {
        commit('unlikePost', {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch(err => {
        console.error(err);
      });
  },
  updatePostStatus({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/status`,
        {
          status: payload.status,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('updatePostStatus', {
          postId: payload.postId,
          status: res.data,
        });
      });
  },
  async loadSearchPosts({ commit }, payload) {
    if (payload && payload.reset) {
      const res = await this.$axios.get(`/posts/search/${payload.searchWord}`);
      commit('loadPosts', {
        data: res.data,
        reset: true,
      });
      return;
    }
    if (state.hasMorePost) {
      const lastPost = state.mainPosts[state.mainPosts.length - 1];
      //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
      const res = await this.$axios.get(
        `/posts/search/${payload.searchWord}?lastId=${
          lastPost && lastPost.id
        }&limit=10`,
      );
      commit('loadPosts', {
        data: res.data,
      });
      return;
    }
  },
  async loadAllHashtags({ commit }, payload) {
    try {
      const res = await this.$axios.get(`/posts/allTags`);
      commit('loadHashtags', {
        data: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  },
};
export default actions;
