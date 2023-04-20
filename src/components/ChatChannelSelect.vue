<template>
  <q-tree
    default-expand-all
    style="width: 200px"
    no-connectors
    node-key="_id"
    :nodes="(store.populated.map(el => {
        return {...el, selectable: false }
      }) as unknown[]) as QTreeNode[]"
    v-model:selected="selected"
    selected-color="primary"
  >
    <template v-slot:default-header="{ node }">
      {{ node.name }}
    </template>
  </q-tree>
</template>

<script lang="ts" setup>
import { QTreeNode } from 'quasar';
import { useChannelStore } from 'src/stores/channel';
import { computed } from 'vue';
const store = useChannelStore();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const selected = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>
