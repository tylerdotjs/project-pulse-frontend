import { useChannelStore } from './channel';
import { defineStore } from 'pinia';
import { MessageBase, generateFakeMessageBase } from 'src/models/message.model';
import { UnwrapNestedRefs, computed } from 'vue';
import { useProfileStore } from './profile';
import { useAuthStore } from './auth';
import { faker } from '@faker-js/faker';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';
import { Profile } from 'src/models/profile.model';

const authStore = useAuthStore();
const channelStore = useChannelStore();
const profileStore = useProfileStore();

export class ChatMessage extends MassStoreItem<MessageBase> {
  protected pullFn(): Promise<MessageBase> {
    throw new Error('Method not implemented.');
  }
  sender = computed((): Profile | undefined => {
    if (!this.data) return;
    return profileStore.get(this.data?.sender).data;
  });
}

export class ChatData extends MassStore<ChatMessage> {
  createItem(id: string): ChatMessage {
    return new ChatMessage(id);
  }
}

export const useMessageStore = defineStore('message', () => {
  const data = new ChatData();

  function fillFake(channel?: string) {
    const ids = profileStore.ids;
    const mIds = data.ids;
    const channelIds = channel
      ? [channel]
      : channelStore.childrenItems.map((el) => el.id);
    const lastMessage = mIds.length > 0 ? data.get(mIds[0]) : undefined;
    for (let i = 0; i < 10; i++) {
      const generated = generateFakeMessageBase(
        ids[Math.floor(ids.length * Math.random())],
        channelIds[Math.floor(channelIds.length * Math.random())]
      );
      if (lastMessage?.data) {
        generated.createdAt = new Date(
          lastMessage.data.createdAt.valueOf() - 60000
        );
      }
      const item = data.addItem(generated._id, generated);
      data.setItemIndex(item.id, 0);
    }
  }

  function send(message: string, channelId: string) {
    const itemData = {
      _id: faker.database.mongodbObjectId(),
      sender: authStore.getUid()?.value || '',
      channelId,
      text: message,
      createdAt: new Date(),
    };

    return data.addItem(itemData._id, itemData);
  }

  return {
    get: (id: string) => data.get(id) as UnwrapNestedRefs<ChatMessage>,
    items: data.items,
    pull: (channel?: string) => fillFake(channel),
    send,
  };
});
