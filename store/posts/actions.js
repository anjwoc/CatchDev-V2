import throttle from 'lodash.throttle';

const actions = {
  add({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(
          '/post',
          {
            ...payload,
            image: state.imagePaths,
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          commit('addMainPost', res.data);
          resolve(res.data.id);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  update({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(
          `/post/${payload.id}/update`,
          {
            ...payload,
            image: state.imagePaths,
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          commit('updateMainPost', res.data);
          resolve(res.data.id);
        })
        .catch(err => {
          reject(err);
        });
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
  addComment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post(
          `/comment/${payload.postId}`,
          {
            ...payload,
            // postId: payload.postId,
            // content: payload.content,
            // isPrivate: payload.isPrivate,
          },
          {
            withCredentials: true,
          },
        )
        .then(res => {
          commit('addComment', res.data);
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  deleteComment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
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
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateComment({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
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
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  async loadPost({ dispatch, commit }, payload) {
    try {
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
      let category = payload.category;
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/posts/category?category=${category}`,
        );

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
          `/posts/category?item=${category}&lastId=${
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
      const res = await this.$axios.get(`/posts/tags/${payload.tag}`);
      commit('loadPosts', {
        data: res.data,
        reset: true,
      });
      return;
    }
    if (state.hasMorePost) {
      const lastPost = state.mainPosts[state.mainPosts.length - 1];
      const res = await this.$axios.get(
        `/posts/tags/${payload.tag}?lastId=${lastPost && lastPost.id}&limit=10`,
      );
      commit('loadPosts', {
        data: res.data,
      });
      return;
    }
  }, 2000),
  async loadComments({ commit }, postId) {
    await this.$axios
      .get(`/comment/${postId}`)
      .then(res => {
        commit('loadComments', {
          postId: postId,
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
      })
      .catch(err => {
        console.error(err);
      });
  },
  async loadSearchPosts({ commit }, payload) {
    if (payload && payload.reset) {
      const res = await this.$axios.get(`/posts/search/${payload.word}`);
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
        `/posts/search/${payload.word}?lastId=${
          lastPost && lastPost.id
        }&limit=10`,
      );
      commit('loadPosts', {
        data: res.data,
      });
      return;
    }
  },
  async loadAllHashtags({ commit }) {
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
