<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-tabs v-model="tab" shrink>
          <q-route-tab to="/dashboard" label="Dashboard" />
          <q-route-tab to="/projects" label="Projects" />
          <q-route-tab to="/chat" label="Chat" />
        </q-tabs>
        <q-space></q-space>
        <div class="q-gutter-md">
          <NotificationDrawer></NotificationDrawer>
          <q-avatar color="white" text-color="black">
            <img :src="user?.avatar" alt="" />
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import NotificationDrawer from 'components/NotificationDrawer.vue';
import { useProfileStore } from 'src/stores/profile';
import { useAuthStore } from 'src/stores/auth';
import { Profile } from 'src/models/profile.model';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const tab = ref('');

const user = computed<Profile | undefined>(() => {
  const uid = authStore.getUid();
  if (!uid.value) return undefined;

  return profileStore.get(uid.value).value;
});
</script>
