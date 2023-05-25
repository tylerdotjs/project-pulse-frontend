<template>
  <div class="flex column no-wrap" @click="open = true">
    <q-checkbox
      v-model="open"
      style="margin-left: auto"
      checked-icon="chevron_left"
      unchecked-icon="chevron_right"
      keep-color
      :color="$q.dark.isActive ? 'white' : 'black'"
    ></q-checkbox>
    <q-scroll-area v-if="open" style="width: 200px; height: 100%">
      <q-tree
        default-expand-all
        no-connectors
        node-key="_id"
        :nodes="store.treeNodes"
        v-model:selected="selected"
        selected-color="primary"
      >
        <template v-slot:default-header="{ node }">
          {{ node.name }}
        </template>
      </q-tree>
    </q-scroll-area>
  </div>
</template>

<script lang="ts" setup>
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
