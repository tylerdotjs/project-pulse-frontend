import { defineStore } from 'pinia';
import { useProfileStore } from './profile';
import { ref } from 'vue';

const profileStore = useProfileStore();

export const useAuthStore = defineStore('auth', () => {
  const uid = ref<string | undefined>(profileStore.getIds()[0]);

  return { getUid: () => uid };
});
