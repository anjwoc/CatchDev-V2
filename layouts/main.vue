<template>
  <v-app>
    <header class="container" :style="{ 'box-shadow': '0 1px 0 0 #e6e7eb' }">
      <v-toolbar class="pa-0" flat>
        <v-toolbar-title
          class="font-weight-bold"
          style="cursor: pointer; font-size: 28px"
          @click="$router.push('/')"
        >
          CatchStudy
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <div>
          <v-btn class="ma-0 pa-0" icon @click="search = !search">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <input
            v-if="search"
            class="search_box mx-2 ml-0 mr-10"
            @keydown.enter="toSearchPage"
            autocomplete="off"
            placeholder="Search"
            type="text"
          />
          <p class="search_hint caption">
            검색할 단어 앞에 #을 붙이면 연관 해시태그 게시물이 나옵니다.
          </p>
        </div>

        <div v-if="!me">
          <v-btn
            class="toolbar-btn text-capitalize font-weight-bold"
            to="/login"
            depressed
          >
            Sign in
          </v-btn>

          <v-btn
            class="toolbar-btn text-capitalize font-weight-bold"
            depressed
            outlined
            style="border: 1px solid grey"
            to="/signup"
          >
            Sign up
          </v-btn>
        </div>
        <div v-else>
          <user-profile-menu />
        </div>
        <template v-slot:extension>
          <v-tabs
            active-class="tab__active"
            class="pa-0 ma-0"
            v-model="tab"
            grow
            slider-size="0"
          >
            <v-tabs-slider></v-tabs-slider>
            <v-tab v-for="tab in tabs" :key="tab" @change="onChangeTabs(tab)">
              <span class="text-capitalize">{{ tab }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
    </header>

    <div>
      <nuxt />
    </div>
    <div style="height: 1000px"></div>
  </v-app>
</template>

<script>
  import UserProfileMenu from '@/components/UserProfileMenu';
  export default {
    components: {
      UserProfileMenu,
    },
    data() {
      return {
        search: false,
        tab: '',
        tabs: [
          '전체',
          '어학',
          '고시/공무원',
          '취미/교양',
          '프로그래밍',
          '자율',
          '기타',
        ],
      };
    },
    methods: {
      toSearchPage(e) {
        const word = e.target.value;
        if (word.includes('#')) {
          this.$router.push(`/search/tag/${word.split('#')[1]}`);
          return;
        }
        this.$router.push(`/search/${word}`);
      },
      onChangeTabs(category) {
        switch (category) {
          case '전체':
            return this.$store.dispatch('posts/loadPosts', { reset: true });
            break;
          default:
            return this.$store.dispatch('posts/loadCategoryPosts', {
              reset: true,
              category: category,
            });
            break;
        }
      },
      onLogout() {
        this.$store
          .dispatch('users/logOut')
          .then(() => {
            this.$router.push({ path: '/' });
          })
          .catch(err => {
            console.error(err);
          });
      },
    },
    computed: {
      me() {
        return this.$store.state.users.me;
      },
    },
    head() {
      return {
        title: '최근 게시글',
      };
    },
  };
</script>
<style lang="scss" scoped>
  .search_box {
    border: 1px solid grey;
    border-radius: 3px;
    padding: 5px 10px;
  }

  .search_hint {
    color: #953675;
    font-weight: 550;
    position: absolute;
    top: 3rem;
    right: 10rem;
    opacity: 0;
    display: inline;
    transition: opacity 0.3s ease-in-out;
    -o-transition: opacity 0.3s ease-in-out;
    -moz-transition: opacity 0.3s ease-in-out;
    -webkit-transition: opacity 0.3s ease-in-out;
  }
  input:focus + .search_hint {
    opacity: 1;
  }
</style>
