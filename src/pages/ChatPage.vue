<template>
  <q-page class="flex no-wrap" :style-fn="fillPageStyleFn">
    <chat-channel-select-menu v-model="store.active"></chat-channel-select-menu>
    <q-separator vertical></q-separator>
    <div class="flex no-wrap column" style="flex-grow: 1">
      <chat-viewport
        style="flex-grow: 1"
        :channel="store.active"
      ></chat-viewport>
      <q-separator></q-separator>
      <chat-input></chat-input>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import ChatViewport from 'src/components/ChatViewport.vue';
import fillPageStyleFn from './fillPageStyle.fn';
import ChatInput from 'src/components/ChatInput.vue';
import ChatChannelSelectMenu from 'src/components/ChatChannelSelect.vue';
import { useChannelStore } from 'src/stores/channel';

const store = useChannelStore();
</script>
