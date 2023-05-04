<template>
  <q-btn round flat dense icon="notifications" class="q-ml-md">
    <q-badge
      floating
      color="red"
      rounded
      class="q-sm"
      v-if="store.items.length > 0"
      >{{ store.items.length }}</q-badge
    >
    <q-menu style="min-height: 400px" v-model="showing">
      <q-list style="width: 400px" separator>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h5"> Notifications </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn
              color="primary"
              @click="
                store.clear();
                showing = false;
              "
            >
              Clear
            </q-btn>
          </q-item-section>
        </q-item>
        <q-item v-for="notification in store.items" :key="notification.id">
          <q-item-section>
            <q-item-label>
              {{ notification.value?.body }}
            </q-item-label>
          </q-item-section>
          <q-item-section top side>
            <q-item-label caption>
              {{ notification.value?.timestamp.toLocaleString() }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useNotificationStore } from 'src/stores/notification';

const store = useNotificationStore();

const showing = ref(false);
</script>
