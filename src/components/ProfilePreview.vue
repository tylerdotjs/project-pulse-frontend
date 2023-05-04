<template>
  <q-item v-if="profile">
    <q-item-section side>
      <q-avatar>
        <img :src="profile.data?.avatar" />
      </q-avatar>
    </q-item-section>
    <div class="flex column justify-start">
      <q-item-label class="text-subtitle1 text-no-wrap">
        {{ profile.data?.name }}
      </q-item-label>
      <q-item-label caption>
        {{ profile.id }}
      </q-item-label>
    </div>
  </q-item>
  <q-item v-else> No profile </q-item>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { useProfileStore } from 'src/stores/profile';
import { computed } from 'vue';

const store = useProfileStore();
const authStore = useAuthStore();

const props = defineProps<{
  id?: string;
}>();

const profile = computed(() => {
  const id = props.id || authStore.uid;
  if (!id) return null;

  const profile = store.get(id);
  return profile;
});
</script>
