import throttle from 'lodash.throttle';

export const state = () => ({
  me: null,
  imagePaths: '',
  profileData: {
    allPosts: [],
    recruitingPosts: [],
    closedPosts: [],
  },
});
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

export const actions = {
  loadPosts: throttle(async function ({ commit }, payload) {
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(`/posts/${payload.userId}/AllPosts`);
        commit('loadPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.allPosts[state.allPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(
          `/posts/${payload.userId}/AllPosts?lastId=${
            lastPost && lastPost.id
          }&limit=5`,
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
  loadClosedPosts: throttle(async function ({ commit }, payload) {
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/posts/${payload.userId}/allClosedPosts`,
        );
        commit('loadClosedPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost = state.closedPosts[state.closedPosts.length - 1];
        //lastPost가 존재하는지 체크하고 lastPost.id를 넘김
        const res = await this.$axios.get(
          `/posts/${payload.userId}/allClosedPosts?lastId=${
            lastPost && lastPost.id
          }&limit=5`,
        );
        commit('loadClosedPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  loadRecruitingPosts: throttle(async function ({ commit }, payload) {
    //내가 작성한 글만 불러옴, 진행중인것도 종료된것도 전부 불러옴
    try {
      if (payload && payload.reset) {
        const res = await this.$axios.get(
          `/posts/${payload.userId}/allRecruitingPosts`,
        );
        commit('loadRecruitingPosts', {
          data: res.data,
          reset: true,
        });
        return;
      }
      if (state.hasMorePost) {
        const lastPost =
          state.recruitingPosts[state.recruitingPosts.length - 1];
        const res = await this.$axios.get(
          `/posts/${payload.userId}/allRecruitingPosts?lastId=${
            lastPost && lastPost.id
          }&limit=5`,
        );
        commit('loadRecruitingPosts', {
          data: res.data,
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }, 2000),
  // loadUser: throttle(async function ({commit, state}, payload) {
  //   try {
  //     const res = await this.$axios.get('/user', {
  //       withCredentials: true,
  //     });
  //     commit('setMe', res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, 1000),
  async loadUser({ state, commit }) {
    try {
      const res = await this.$axios.get('/user', {
        withCredentials: true,
      });
      commit('setMe', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  async signUp({ commit }, payload) {
    return await this.$axios
      .post(
        '/user',
        {
          email: payload.email,
          password: payload.password,
          name: payload.name,
          about: payload.about,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        if (res.status === 200) {
          commit('setMe', res.data);
          return res;
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          return err;
        }
      });
  },
  async githubLogIn({ commit }, payload) {
    console.log(payload);
    await this.$axios
      .post(
        '/auth/githubLogin',
        {
          email: payload.email,
          socialType: payload.socialType,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('setMe', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  async logIn({ commit }, payload) {
    return await this.$axios
      .post(
        '/user/login',
        {
          email: payload.email,
          password: payload.password,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        commit('setMe', res.data);
      })
      .catch(err => {
        console.error(err);
      });
  },
  async logOut({ commit }, payload) {
    await this.$axios
      .post(
        '/user/logout',
        {},
        {
          withCredentials: true,
        },
      )
      .then(() => {
        commit('setMe', null);
      })
      .catch(err => {
        console.error(err);
      });
  },
  async loadConnectionUser({ state, commit }, payload) {
    try {
      const res = await this.$axios.get(`/user/${payload.id}`, {
        withCredentials: true,
      });
      commit('setMe', res.data);
    } catch (err) {
      console.error(err);
    }
  },
  updateProfile({ commit, state }, payload) {
    return this.$axios
      .post(
        `/user/updateProfile/${payload.userId}`,
        {
          userId: payload.userId,
          name: payload.name,
          job: payload.job,
          location: payload.location,
          about: payload.about,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
  updateProfileImage({ commit, state }, payload) {
    return this.$axios
      .post(`/user/image`, payload, {
        withCredentials: true,
      })
      .then(res => {
        commit('updateProfileImage', res.data);
        return res.data;
      });
  },
  updateSns({ commit, state }, payload) {
    return this.$axios
      .post(
        `/sns/user/${payload.userId}`,
        {
          github: payload.github,
          gmail: payload.gmail,
          facebook: payload.facebook,
        },
        {
          withCredentials: true,
        },
      )
      .then(res => {
        return res.data;
      })
      .catch(err => {
        console.error(err);
      });
  },
};
