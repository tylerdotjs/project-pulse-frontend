<template>
  <div>
    <div>{{ user.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useProfileStore } from 'src/stores/profile';
import { computed } from 'vue';

const props = defineProps<{
  id: string;
}>();

const profileStore = useProfileStore();

const user = computed(() => profileStore.get(props.id).value);
</script>
