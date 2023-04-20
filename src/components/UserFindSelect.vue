<template>
  <div class="flex items-center dense">
    <q-chip
      v-for="item in value"
      :key="item"
      removable
      @remove="removeItem(item)"
      >{{ item }}</q-chip
    >
    <q-btn icon="add" style="border: 1px solid grey" round size="sm" dense flat>
      <q-menu class="flex column q-pa-md" style="height: 500px">
        <q-input v-model="searchVal" dense></q-input>
        <q-card
          class="scroll q-mt-md"
          style="flex-grow: 1"
          flat
          bordered
        ></q-card>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from 'src/stores/profile';
import { ref } from 'vue';

const store = useProfileStore();

const value = ref<string[]>(['q', 'wad']);
const searchVal = ref<string>('');

function removeItem(item: string) {
  const index = value.value.indexOf(item);
  if (index >= 0) {
    value.value.splice(index, 1);
  }
}
</script>
