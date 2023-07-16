<template>
  <q-dialog
      persistent
      v-model="visible"
      @hide="hide"
  >
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="red" text-color="white" />
        <span class="q-ml-sm">{{ text }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="キャンセル" color="primary" v-close-popup />
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import {ref, toRefs, watch} from "vue";

interface Props {
  show?: boolean,
  text?: string,
}
const props = defineProps<Props>()
const emits = defineEmits<{(e: "update:hide", value: void): void}>()
const { show } = toRefs(props);
const visible = ref(false);

visible.value = props.show ?? false;
watch(show as any, (value: boolean) => {
  visible.value = value;
})

const hide = () => {
  emits("update:hide", undefined);
}

</script>

<style scoped>

</style>