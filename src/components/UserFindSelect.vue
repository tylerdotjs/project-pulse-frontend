<template>
  <q-menu class="flex column no-wrap" style="height: 500px">
    <div class="q-pa-md">
      <q-input v-model="searchInput" dense></q-input>
    </div>
    <q-separator></q-separator>
    <q-list class="scroll" style="flex-grow: 1; min-width: 250px" separator>
      <q-item
        v-for="item in options"
        :key="item.id"
        clickable
        v-ripple
        @click="toggleSelect(item.id)"
      >
        <q-item-section>
          <profile-preview :id="item.id"></profile-preview>
        </q-item-section>
        <q-item-section side
          ><q-checkbox
            :model-value="selected.includes(item.id)"
            @update:model-value="toggleSelect(item.id)"
          ></q-checkbox
        ></q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>

<script lang="ts" setup>
import ProfilePreview from './ProfilePreview.vue';
import { useProfileStore } from 'src/stores/profile';
import { computed, ref } from 'vue';

const store = useProfileStore();

const props = defineProps<{
  modelValue: string[];
}>();

const emit = defineEmits<{
  (event: 'update:modelValue', value: string[]): void;
}>();

const selected = computed<string[]>({
  get: () => props.modelValue,
  set: (value: string[]) => emit('update:modelValue', value),
});

const searchInput = ref<string>('');
const options = store.reactiveSearch(searchInput);

function toggleSelect(id: string) {
  const index = selected.value.indexOf(id);
  if (index >= 0) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(id);
  }
}
</script>
