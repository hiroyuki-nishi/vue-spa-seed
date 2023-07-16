<template>
  <q-input
      square clearable stack-label
      :maxlength="maxLength"
      :label="required ? `*${label}` : `${label}`"
      :disable="disable"
      :filled="filled"
      :input-class="textRight ? 'text-right' : 'text-left'"
      :placeholder="placeholder"
      :rules="[val => (required ? !!val : true)|| '必須項目です']"
      :type="type"
      v-model="formGroup.value"
      @keydown.enter.prevent="enter"
      @update:model-value="update"
  >
    <template v-slot:append>
      <slot name="append" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import {QInput} from "quasar";
import {ref, toRefs, watch} from "vue";

interface Props {
  disable?: boolean,
  filled?: boolean,
  label?: string,
  maxLength?: number,
  modelValue?: string,
  placeholder?: string,
  required?: boolean,
  textRight?: boolean,
  type?: string,
}
const props = defineProps<Props>()
const emits = defineEmits<{(e: "update:modelValue", value: string): void, (e: "enter", value: void): void}>()
const { modelValue } = toRefs(props);
const formGroup = ref({
  value: ""
});

formGroup.value.value = modelValue?.value ?? "";
watch(modelValue as any, (value: string) => {
  formGroup.value.value = value;
});

const update = () => {
  emits("update:modelValue", formGroup.value.value);
}

const enter = () => emits("enter", );

</script>

<style scoped>

</style>