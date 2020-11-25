<template>
  <v-container
    class="mt-4 bg-lightgrey pa-10"
    style="height: 100%; border-radius: 10px"
  >
    <div class="text-h4 font-weight-bold d-flex justify-center">
      Study Management
    </div>
    <div class="caption font-weight-black d-flex justify-center mb-7">
      모집중인 스터디들을 관리할 수 있습니다.
    </div>
    <v-row>
      <v-col cols="12">
        <div class="mb-4 caption font-weight-bold grey--text text--darken-1">
          모집중인 스터디
        </div>
        <v-card class="" elvation="0" width="100%">
          <v-expansion-panels focusable>
            <v-expansion-panel v-for="(item, i) in 5" :key="i">
              <v-expansion-panel-header>
                <v-col>
                  
                </v-col>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {};
</script>

<style lang="scss" scoped></style>
