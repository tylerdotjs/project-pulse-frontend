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
          <q-btn round>
            <q-avatar color="white" text-color="black"> TL </q-avatar>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import NotificationDrawer from 'components/NotificationDrawer.vue';

const tab = ref('');
</script>
