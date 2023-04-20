import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import {
  ChatChannel,
  PopulatedChatChannel,
  defaultChatChannel,
  generateFakeChatChannel,
} from 'src/models/chatChannel.model';
import ReactiveMap from 'src/models/reactiveMap.class';

export const useChannelStore = defineStore('channel', () => {
  const data = new ReactiveMap<ChatChannel>(defaultChatChannel);
  const active = ref<string>('');

  function fillFake(count: number, children: number) {
    const ids: string[] = [];

    for (let i = 0; i < children * count; i++) {
      const fake = generateFakeChatChannel(true);
      ids.push(fake._id);
      data.add(fake);
    }
    for (let i = 0; i < count; i++) {
      data.add(generateFakeChatChannel(false, ids.splice(0, children)));
    }
  }

  fillFake(3, 3);
  active.value = data.getIds()[0];

  const populated = computed<PopulatedChatChannel[]>(() =>
    data.computedArray.value
      .filter((el) => el.root)
      .map((el) => {
        const children = el.children.map((id) => data.get(id).value);
        return {
          ...el,
          children,
        };
      })
  );

  const computedChildrenArray = computed<ChatChannel[]>(() =>
    data.computedArray.value.filter((el) => !el.root)
  );

  const childrenIds = computed<string[]>(() =>
    computedChildrenArray.value.map((el) => el._id)
  );

  return {
    active,
    get: (id: string) => data.get(id),
    computedArray: computedChildrenArray,
    childrenIds,
    ids: data.ids,
    populated,
  };
});
