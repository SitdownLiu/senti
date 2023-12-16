<template>
  <v-form-designer :designer-config="designerConfig"></v-form-designer>
</template>

<script setup name="VForm3">
import { ref } from 'vue';
const designerConfig = ref({
  externalLink: false,
});

const designer = ref(null);
</script>

<style lang="scss" scoped></style>
