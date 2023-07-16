<template>
  <q-btn
      :class="cssClass"
      :flat="flat"
      :icon="icon"
      :label="label"
      :round="round"
      :size="size"
      :type="type"
      @click="onClick"
  />
</template>

<script setup lang="ts">
interface Props {
  class?: string,
  flat?: boolean,
  icon?: string,
  label?: string,
  round?: boolean,
  size?: string,
  type?: string,
  whiteColor?: boolean,

}
const props = defineProps<Props>()
const emits = defineEmits<{(e: "click", value: void): void}>()
const cssClass = (props.whiteColor ? "text-bold text-secondary-color " : "secondary-bg-color text-white ") + props.class;

const onClick = () => {
  emits("click", );
}

</script>

<style scoped>

</style>