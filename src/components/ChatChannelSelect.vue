<template>
  <div class="flex column" @click="open = true">
    <q-checkbox
      v-model="open"
      style="margin-left: auto"
      checked-icon="chevron_left"
      unchecked-icon="chevron_right"
      keep-color
      :color="$q.dark.isActive ? 'white' : 'black'"
    ></q-checkbox>
    <q-tree
      v-if="open"
      default-expand-all
      style="width: 200px"
      no-connectors
      node-key="_id"
      :nodes="(store.populated.map(el => {
        // channels with children cannot have messages attached to them
        return {...el, selectable: el.children.length <= 0 }
      }) as unknown[]) as QTreeNode[]"
      v-model:selected="selected"
      selected-color="primary"
    >
      <template v-slot:default-header="{ node }">
        {{ node.name }}
      </template>
    </q-tree>
  </div>
</template>

<script lang="ts" setup>
import { QTreeNode } from 'quasar';
import { useChannelStore } from 'src/stores/channel';
import { computed, ref } from 'vue';
const store = useChannelStore();

const props = defineProps<{
  modelValue: string;
}>();

const open = ref(true);

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const selected = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>
