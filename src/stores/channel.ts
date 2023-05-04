import { computed, ref, UnwrapNestedRefs } from 'vue';
import { defineStore } from 'pinia';
import {
  ChatChannel,
  generateFakeChatChannel,
} from 'src/models/chatChannel.model';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';
import { QTreeNode } from 'quasar';

export class ChannelItem extends MassStoreItem<ChatChannel> {
  protected pullFn(): Promise<ChatChannel> {
    throw new Error('Method not implemented.');
  }

  parent: ChannelData;

  children = computed(() => {
    if (!parent || !this.data.value) return [];

    return this.data.value.children.map((el) => this.parent.get(el));
  });

  constructor(parent: ChannelData, id: string) {
    super(id);
    this.parent = parent;
  }
}
export class ChannelData extends MassStore<ChannelItem> {
  createItem(id: string): ChannelItem {
    return new ChannelItem(this, id);
  }
}

export const useChannelStore = defineStore('channel', () => {
  const data = new ChannelData();
  const active = ref<string>('');

  function fillFake(count: number, children: number) {
    const ids: string[] = [];

    for (let i = 0; i < children * count; i++) {
      const fake = generateFakeChatChannel(true);
      ids.push(fake._id);
      data.addItem(fake._id, fake);
    }
    for (let i = 0; i < count; i++) {
      const fake = generateFakeChatChannel(false, ids.splice(0, children));
      data.addItem(fake._id, fake);
    }
  }

  fillFake(3, 3);
  active.value = data.ids[0];

  const rootItems = computed(() =>
    data.items.value.filter((el) => el.data?.root)
  );

  const childrenItems = computed(() =>
    data.items.value.filter((el) => el.data && !el.data.root)
  );

  function itemToTreeNode(item: UnwrapNestedRefs<ChannelItem>): QTreeNode {
    return {
      ...item.data,
      children: item.children.map(itemToTreeNode),
    };
  }

  return {
    active,
    get: (id: string) => data.get(id),
    rootItems,
    childrenItems,
    itemToTreeNode,
  };
});
