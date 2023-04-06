<template>
  <q-page :style-fn="fillPageStyleFn">
    <div class="flex no-wrap" style="flex-direction: column; height: 100%">
      <chat-viewport style="flex-grow: 1"></chat-viewport>
      <q-separator></q-separator>
      <chat-input></chat-input>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import ChatViewport from 'src/components/ChatViewport.vue';
import fillPageStyleFn from './fillPageStyle.fn';
import ChatInput from 'src/components/ChatInput.vue';
</script>
