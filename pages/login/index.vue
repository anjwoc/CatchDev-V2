<template>
  <v-container class="fill-height background" fluid>
    <v-row class="mt-0 pt-0" justify="center">
      <v-col cols="12" sm="10" md="7" lg="6">
        <v-card outlined width="600">
          <v-container>
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-container></v-container>
                <v-spacer></v-spacer>
                <v-text-field
                  label="Email"
                  v-model="email"
                  prepend-inner-icon="person"
                  :rules="emailRules"
                  type="email"
                  required
                  outlined
                />
                <v-text-field
                  label="Password"
                  v-model="password"
                  name="password"
                  prepend-inner-icon="lock"
                  :rules="passwordRules"
                  type="password"
                  required
                  outlined
                />
                <v-btn
                  x-large
                  width="100%"
                  type="submit"
                  :disabled="!valid"
                  color="grey darken-1"
                  style="font-weight: bold; color: white"
                  >로그인</v-btn
                >
              </v-form>

              <v-card-actions
                class="ma-0 pa-0"
                style="font-weight: bold; color: black"
              >
                <v-divider></v-divider>
                OR
                <v-divider></v-divider>
              </v-card-actions>

              <v-row
                align="center"
                justify="center"
                style="margin-bottom: 20px; margin-top: 20px"
              >
                <v-btn
                  x-large
                  color="grey lighten-2"
                  width="90%"
                  dark
                  style="color: black"
                  @click="githubRedirect"
                >
                  <v-icon left x-large color="black">mdi-github</v-icon>&nbsp;
                  Github 로그인
                </v-btn>
              </v-row>
              <v-row
                align="center"
                justify="center"
                style="margin-bottom: 20px"
              >
                <v-btn
                  x-large
                  color="red"
                  width="90%"
                  dark
                  @click="googleRedirect"
                >
                  <v-icon left large>mdi-google</v-icon>&nbsp; Google 로그인
                </v-btn>
              </v-row>
              <v-row
                align="center"
                justify="center"
                style="margin-bottom: 20px"
              >
                <v-btn x-large nuxt to="/signup" color="blue" width="90%" dark>
                  회원가입
                </v-btn>
              </v-row>
              <v-divider></v-divider>
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    githubRedirect() {},
    googleRedirect() {},
  },
}
</script>

<style lang="scss" scoped>
</style>