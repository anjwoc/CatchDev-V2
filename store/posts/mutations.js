import Vue from 'vue';

const mutations = {
  addMainPost(state, payload) {
    state.mainPosts.unshift(payload);
  },
  updateMainPost(state, payload) {
    const postIndex = state.mainPosts.findIndex(v => v.id === payload.id);
    Vue.set(state.mainPosts[postIndex], postIndex, payload);
  },
  removeMainPost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts.splice(index, 1);
  },
  concatImagePaths(state, payload) {
    state.imagePaths = state.imagePaths.concat(payload);
  },
  loadRelatedPosts(state, payload) {
    const newPosts = payload.newPosts;
    const currentPostId = payload.currentPostId;
    const result = [];

    if (newPosts && newPosts.length === 1) {
      // 1개 이하인 경우 posts가 배열이 아닌 하나의 객체
      const data = { id: newPosts[0].id, title: newPosts[0].title };
      if (data.id !== parseInt(currentPostId)) {
        result.push(data);
      }
    } else {
      newPosts.forEach(item => {
        const data = { id: item.id, title: item.title };
        // 현재 게시글을 제외한 연관 게시글 추출
        if (data.id !== parseInt(currentPostId)) {
          result.push(data);
        }
      });
    }

    state.relatedPosts = result;
  },
  loadPost(state, payload) {
    //배열 전체를 바꿔줌
    state.mainPosts = [payload];
  },
  loadPosts(state, payload) {
    if (payload.reset) {
      state.mainPosts = payload.data;
    } else {
      //실수로 payload를 concat해서 lastPost가 10개의 배열 값이 들어가서 id값이 undefined로 찍혀서 실수
      state.mainPosts = state.mainPosts.concat(payload.data);
    }
    // true이면 10개를 가져와서 이후에도 더 불러올게 있다는 뜻이고
    // false이면 10미만이여서 더 이상 가져올게 없다는 의미
    state.hasMorePost = payload.data.length === 10;
  },
  loadComments(state, payload) {
    console.log('loadComments');
    if (payload.data.length == 0) return;
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);

    Vue.set(state.mainPosts[index], 'Comments', payload.data);
  },
  updateToggleComment(state, payload) {
    const commentIdx = state.mainPosts[0].Comments.findIndex(
      v => v.id === payload.commentId,
    );
    Vue.set(
      state.mainPosts[0].Comments[commentIdx],
      'updateOpened',
      !payload.updateOpened,
    );
  },
  updateComment(state, payload) {
    const index = state.mainPosts[0].Comments.findIndex(
      v => v.id === payload.id,
    );
    state.mainPosts[index].Comments[index] = payload;
  },
  addComment(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Comments.unshift(payload);
  },
  deleteComment(state, payload) {
    const postIndex = state.mainPosts.findIndex(v => v.id === payload.postId);
    const index = state.mainPosts[postIndex].Comments.findIndex(
      v => v.id === payload.id,
    );
    state.mainPosts[postIndex].Comments.splice(index, 1);
  },
  unlikePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    const userIndex = state.mainPosts[index].Likers.findIndex(
      v => v.id === payload.userId,
    );
    state.mainPosts[index].Likers.splice(userIndex, 1);
  },
  likePost(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].Likers.push({
      id: payload.userId,
    });
  },
  updatePostStatus(state, payload) {
    const index = state.mainPosts.findIndex(v => v.id === payload.postId);
    state.mainPosts[index].status = payload.status;
  },
  loadHashtags(state, payload) {
    const tags = payload.data.map(v => v.name);
    state.hashtags = tags;
  },
  setWritingPost(state, payload) {
    if (payload) {
      state.writingPost = { ...payload };
      return;
    }
    state.writingPost = {};
  },
};
export default mutations;
