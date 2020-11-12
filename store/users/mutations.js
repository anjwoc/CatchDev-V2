export const mutations = {
  setMe(state, payload) {
    state.me = Object.freeze(payload);
  },
  updateProfileImage(state, payload) {
    state.me.imgSrc = payload;
  },
  logOut(state) {
    state.me = null;
  },
  loadPosts(state, payload) {
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    if (payload.reset) {
      state.profileData.allPosts = payload.data;
    } else {
      state.profileData.allPosts.concat(payload.data);
    }
  },
  loadRecruitingPosts(state, payload) {
    //진행중인 스터디만 불러옴
    if (payload.reset) {
      state.profileData.recruitingPosts = payload.data;
    } else {
      state.profileData.recruitingPosts.concat(payload.data);
    }
  },
  loadClosedPosts(state, payload) {
    //종료된 스터디만 불러옴
    if (payload.reset) {
      state.profileData.closedPosts = payload.data;
    } else {
      state.profileData.closedPosts.concat(payload.data);
    }
  },
};

export default mutations;
