<template>
  <v-container class="fill-height background" fluid>
    <v-row class="mt-0 pt-0" justify="center">
      <v-col cols="12" justify="center" align="center">
        <v-card class="elevation-6 pa-0" width="500">
          <v-card-text class="text-center mb-0 pb-0">
            <div class="text-h5" style="font-weight: 500">Login</div>
          </v-card-text>
          <v-container>
            <v-card-text>
              <v-form
                class="mb-lg"
                ref="form"
                v-model="valid"
                @submit.prevent="onSubmitForm"
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  placeholder="Email"
                  type="email"
                  filled
                  rounded
                  required
                >
                  <v-icon
                    small
                    slot="prepend"
                    color="primary"
                    style="font-weight: 1200"
                  >
                    mdi-checkbox-blank-circle-outline
                  </v-icon>
                </v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  placeholder="Password"
                  type="password"
                  filled
                  rounded
                  required
                >
                  <v-icon
                    small
                    slot="prepend"
                    color="primary"
                    style="font-weight: 1200"
                  >
                    mdi-checkbox-blank-circle-outline
                  </v-icon>
                </v-text-field>
                <div class="d-flex ma-1">
                  <v-btn
                    x-large
                    width="50%"
                    rounded
                    type="submit"
                    color="blue lighten-1"
                    style="font-weight: bold; color: white"
                  >
                    <!-- :disabled="!valid" -->
                    Login
                  </v-btn>
                  <div
                    class="ml-2 subtitle1 d-flex align-center"
                    style="opacity: 0.7; word-break: all"
                  >
                    Don't you have an account yet?
                    <span
                      class="blue--text font-weight-bold"
                      style="cursor: pointer"
                      @click="$router.push('signup')"
                    >
                      SignUp
                    </span>
                  </div>
                </div>
              </v-form>
            </v-card-text>
          </v-container>
          <v-card-actions class="ma-0 pa-0" style="color: black">
            <v-divider></v-divider>
            <v-avatar
              class="white blue--text elevation-3"
              style="
                font-weight: 400;
                position: absolute;
                left: 45%;
                font-size: 14px;
              "
              >OR</v-avatar
            >
            <v-divider></v-divider>
          </v-card-actions>
          <div class="blue justify-center align-center">
            <v-card-actions class="blue justify-center mb-0 pb-0 pt-10 pb-5">
              <div class="white--text">Sign In with social platforms</div>
            </v-card-actions>
            <v-card-actions
              class="blue d-flex justify-space-around pb-5"
              style="max-width: 50%; margin: 0 auto"
            >
              <v-btn
                icon
                v-for="idx in socials.length"
                :key="idx"
                @click="onSocialLogin(socials[idx - 1])"
              >
                <v-avatar class="elevation-3 pa-2 white" size="40">
                  <v-icon color="blue lighten-1">{{
                    socialIcons[idx - 1]
                  }}</v-icon>
                </v-avatar>
              </v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        valid: "",
        email: "",
        password: "",
        socialIcons: ["mdi-facebook", "mdi-github", "mdi-google"],
        socials: ["facebook", "github", "google"],
        emailRules: [
          v => !!v || "이메일을 입력해주세요.",
          v => /.+@.+/.test(v) || "이메일이 유효하지 않습니다.",
        ],
        passwordRules: [v => !!v || "비밀번호를 입력해주세요."],
      };
    },
    methods: {
      githubRedirect() {
        window.location.href = `${process.env.baseUrl}/api/auth/github`;
      },
      googleRedirect() {
        window.location.href = `${process.env.baseUrl}/api/auth/google`;
      },
      onSocialLogin(type) {
        switch (type) {
          case "google":
            this.googleRedirect();
            break;
          case "github":
            this.githubRedirect();
            break;
          case "facebook":
            this.$dialog.notify.warning("추가 예정 기능입니다.", {
              position: "top-right",
              timeout: 5000,
            });
            break;
          default:
            break;
        }
      },
      onSubmitForm() {
        if (this.$refs.form.validate()) {
          this.$store
            .dispatch("users/logIn", {
              email: this.email,
              password: this.password,
            })
            .then(res => {
              this.$router.push({ path: "/" });
            })
            .catch(err => {
              this.$dialog.notify.warning(err.response.data, {
                position: "top-right",
                timeout: 5000,
              });
            });
        }
      },
    },
    mounted() {
      const { error } = this.$route.query;
      if (error) {
        this.$dialog.notify.error(error, {
          position: "top-right",
          timeout: 5000,
        });
      }
    },
    middleware: "anonymous",
  };
</script>

<style lang="scss" scoped></style>
