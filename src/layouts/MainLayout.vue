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
          <q-avatar color="white" text-color="black" style="cursor: pointer">
            <img :src="user?.avatar" alt="" />
            <q-menu>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-overline" style="color: grey">
                      Account
                    </q-item-label>
                  </q-item-section>
                </q-item>
                <profile-preview></profile-preview>
                <q-separator></q-separator>
                <q-item>
                  <q-item-section>
                    <q-toggle
                      :model-value="$q.dark.isActive"
                      @update:model-value="$q.dark.set"
                      label="Dark Mode"
                    ></q-toggle>
                  </q-item-section>
                </q-item>
                <q-item clickable v-ripple>
                  <q-item-section>
                    <q-item-label> Logout </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
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
import NotificationDrawer from 'src/components/NotificationMenu.vue';
import { useProfileStore } from 'src/stores/profile';
import { useAuthStore } from 'src/stores/auth';
import { Profile } from 'src/models/profile.model';
import ProfilePreview from 'src/components/ProfilePreview.vue';

const profileStore = useProfileStore();
const authStore = useAuthStore();
const tab = ref('');

const user = computed<Profile | undefined>(() => {
  const uid = authStore.getUid();
  if (!uid.value) return undefined;

  return profileStore.get(uid.value).value;
});
</script>
