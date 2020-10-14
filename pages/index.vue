<template>
  <div>
    <div class="text-center justify-center mt-6 mb-6">
      <div class="text-h5 font-weight-bold">최근 업데이트 된 강의</div>
    </div>
    <v-row>
      <v-col v-for="n in 24" :key="n" md="4" sm="6" xs="12">
        <post-card height="200"></post-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PostCard from '@/components/common/PostCard'
export default {
  components: {
    PostCard,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped>
</style>