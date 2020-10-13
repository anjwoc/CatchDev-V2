<template>
  <v-row>
    <v-col v-for="n in 24" :key="n" cols="4">
      <v-card height="200"></v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>
