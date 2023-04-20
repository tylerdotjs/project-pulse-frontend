import { useChannelStore } from './channel';
import { defineStore } from 'pinia';
import {
  DefaultMessage,
  Message,
  MessageBase,
  generateFakeMessageBase,
} from 'src/models/message.model';
import { ReactiveMapPopulate } from 'src/models/reactiveMapPopulate.class';
import { computed } from 'vue';
import { useProfileStore } from './profile';
import { useAuthStore } from './auth';
import { faker } from '@faker-js/faker';

const authStore = useAuthStore();
const channelStore = useChannelStore();

export const useMessageStore = defineStore('message', () => {
  const profileStore = useProfileStore();

  const data = new ReactiveMapPopulate<MessageBase, Message>(
    (item) =>
      computed(() => {
        const sender = profileStore.get(item.value.sender).value;
        return {
          _id: item.value._id,
          sender,
          text: item.value.text,
          channelId: item.value.channelId,
          createdAt: item.value.createdAt,
        };
      }),
    DefaultMessage
  );

  function fillFake() {
    const ids = profileStore.ids;
    const mIds = data.ids.value;
    const channelIds = channelStore.childrenIds;
    const lastMessage = mIds.length > 0 ? data.get(mIds[0]) : undefined;
    for (let i = 0; i < 10; i++) {
      const generated = generateFakeMessageBase(
        ids[Math.floor(ids.length * Math.random())],
        channelIds[Math.floor(channelIds.length * Math.random())]
      );
      if (lastMessage) {
        generated.createdAt = new Date(
          lastMessage.value.createdAt.valueOf() - 60000
        );
      }
      data.addStart(generated);
    }
  }
  fillFake();

  function send(message: string, channelId: string) {
    return data.add({
      _id: faker.database.mongodbObjectId(),
      sender: authStore.getUid()?.value || '',
      channelId,
      text: message,
      createdAt: new Date(),
    });
  }

  return {
    get: (id: string) => data.getPopulated(id),
    computedArray: data.populatedComputedArray,
    pull: () => fillFake(),
    send,
  };
});
