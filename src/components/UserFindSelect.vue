<template>
  <div class="flex items-center dense">
    <q-chip
      v-for="id in selected"
      :key="id"
      removable
      @remove="removeItem(id)"
      >{{ store.get(id).data.name }}</q-chip
    >
    <q-btn icon="add" style="border: 1px solid grey" round size="sm" dense flat>
      <q-menu class="flex column" style="height: 500px">
        <div class="q-pa-md">
          <q-input v-model="searchInput" dense></q-input>
        </div>
        <q-separator></q-separator>
        <q-list style="flex-grow: 1; min-width: 250px" separator>
          <q-item
            v-for="item in options"
            :key="item._id"
            clickable
            v-ripple
            @click="toggleSelect(item._id)"
          >
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
            </q-item-section>
            <q-item-section side
              ><q-checkbox
                :model-value="selected.includes(item._id)"
                @update:model-value="toggleSelect(item._id)"
              ></q-checkbox
            ></q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from 'src/stores/profile';
import { ref } from 'vue';

const store = useProfileStore();

const selected = ref<string[]>([]);
const searchInput = ref<string>('');
const options = store.reactiveSearch(searchInput);

function removeItem(item: string) {
  const index = selected.value.indexOf(item);
  if (index >= 0) {
    selected.value.splice(index, 1);
  }
}

function toggleSelect(id: string) {
  const index = selected.value.indexOf(id);
  if (index >= 0) {
    selected.value.splice(index, 1);
  } else {
    selected.value.push(id);
  }
}
</script>
