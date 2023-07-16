<template>
  <q-card class="my-card" style="min-width: 1024px">
    <q-card-section class="secondary-bg-color text-white text-bold">
      <slot name="top-left" />
      {{ title }}
    </q-card-section>

    <!-- NOTE: q-card-sectionなどを入れて利用する-->
    <slot name="content" />

    <q-card-actions align="left">
      <slot name="action-left" />
    </q-card-actions>
    <q-card-actions align="right">
      <slot name="action-right" />
    </q-card-actions>
    <q-inner-loading
        :showing="loading"
        label-class="text-teal"
        label-style="font-size: 1.1em"
    />
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  title?: string,
  loading?: boolean,
}
const props = defineProps<Props>()
</script>

<style scoped>
.my-card {
  width: 90vw;
  margin: auto;
}
</style>