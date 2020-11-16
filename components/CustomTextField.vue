<template>
  <div class="d-flex" style="justify-content: center">
    <div class="vertical-center">✔️</div>
    <v-text-field class="my-1 pa-2" hide-details dense></v-text-field>
  </div>
</template>

<script>
  export default {
    props: {
      prependText: [String],
      textFieldClass: [String],
    },
    name: 'CustomTextField',
  };
</script>

<style scoped></style>
