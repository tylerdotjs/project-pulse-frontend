import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  ChatChannel,
  defaultChatChannel,
  generateFakeChatChannel,
} from 'src/models/chatChannel.model';
import ReactiveMap from 'src/models/reactiveMap.class';

export const useChannelStore = defineStore('channel', () => {
  const data = new ReactiveMap<ChatChannel>(defaultChatChannel);
  const active = ref<string>('');

  function fillFake(count: number) {
    for (let i = 0; i < count; i++) {
      data.add(generateFakeChatChannel());
    }
  }

  fillFake(3);
  active.value = data.getIds()[0];

  return {
    active,
    get: (id: string) => data.get(id),
    computedArray: data.computedArray,
    ids: data.ids,
  };
});
