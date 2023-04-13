<template>
  <q-list separator>
    <q-tabs v-model="tab" vertical dense active-color="primary">
      <q-tab
        v-for="channel in store.computedArray"
        :key="channel._id"
        :name="channel._id"
      >
        <q-item-section> {{ channel.name }}</q-item-section>
      </q-tab>
    </q-tabs>
  </q-list>
</template>

<script lang="ts" setup>
import { useChannelStore } from 'src/stores/channel';
import { computed } from 'vue';
const store = useChannelStore();

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const tab = computed<string>({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>
