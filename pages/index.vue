<template>
  <div>
    <div>
      <v-carousel
        cycle
        height="300"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <v-container>
      <div class="text-center justify-center mt-6 mb-6">
        <div class="text-h5 font-weight-bold">최근 업데이트 된 강의</div>
      </div>
      <v-row>
        <v-col v-for="n in 24" :key="n" md="4" sm="6" xs="12">
          <post-card height="200"></post-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import PostCard from '@/components/common/PostCard';

  export default {
    components: {
      PostCard,
    },
    data() {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
      };
    },
  };
</script>
<style scoped></style>
