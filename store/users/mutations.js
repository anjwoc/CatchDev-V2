import cloneDeep from 'lodash.clonedeep';
export const mutations = {
  setMe(state, payload) {
    if (payload && payload.reset) {
      state.me = Object.freeze({ ...payload.user });
      return;
    }
    state.me = Object.freeze(payload);
  },
  updateProfileImage(state, src) {
    let newUser = cloneDeep(state.me);
    newUser.imgSrc = src;
    state.me = Object.freeze(newUser);
  },
  logOut(state) {
    state.me = null;
  },
  loadPosts(state, payload) {
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    if (payload.reset) {
      state.allPosts = payload.data;
    } else {
      state.allPosts.concat(payload.data);
    }
  },
  loadRecruitingPosts(state, payload) {
    //진행중인 스터디만 불러옴
    if (payload.reset) {
      state.recruitingPosts = payload.data;
    } else {
      state.recruitingPosts.concat(payload.data);
    }
  },
  loadClosedPosts(state, payload) {
    //종료된 스터디만 불러옴
    if (payload.reset) {
      state.closedPosts = payload.data;
    } else {
      state.closedPosts.concat(payload.data);
    }
  },
};

export default mutations;
