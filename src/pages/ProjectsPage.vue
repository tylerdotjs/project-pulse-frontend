<template>
  <q-page padding class="q-gutter-md">
    <q-input label="Title" v-model="title" filled></q-input>
    <users-select></users-select>
    <q-input
      label="Description"
      v-model="desc"
      type="textarea"
      filled
    ></q-input>
  </q-page>
</template>

<script lang="ts" setup>
import UsersSelect from 'src/components/UserFindSelect.vue';
import { ref } from 'vue';

const title = ref<string>('');
const desc = ref<string>('');
</script>
