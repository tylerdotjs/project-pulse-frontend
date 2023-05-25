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
}
export class ChannelData extends MassStore<ChannelItem> {
  createItem(id: string): ChannelItem {
    return new ChannelItem(id);
  }
}

export const useChannelStore = defineStore('channel', () => {
  const data = new ChannelData();
  const active = ref<string>('');

  function fillFake(layers: number, perItemPerLayer: number) {
    let previousLayer: string[] = [''];
    for (let l = 0; l < layers; l++) {
      const currentLayer: string[] = [];
      for (let i = 0; i < perItemPerLayer * previousLayer.length; i++) {
        const id = previousLayer[i % previousLayer.length];
        const fake = generateFakeChatChannel(id);
        currentLayer.push(data.addItem(fake._id, fake).id);
      }
      previousLayer = currentLayer;
    }
  }

  fillFake(3, 3);
  active.value = data.ids[0];

  const rootItems = computed(() =>
    data.items.value.filter((el) => el.data && !el.data.parent)
  );

  const childrenItems = computed(() =>
    data.items.value.filter((el) => el.data && el.data.parent)
  );

  function itemToTreeNode(item: UnwrapNestedRefs<ChannelItem>): QTreeNode {
    if (!item.data) return {};

    const children = data.items.value
      .filter((el) => el.data && el.data.parent == item.id)
      .map(itemToTreeNode);

    return {
      ...item.data,
      children,
      selectable: children.length < 1,
    };
  }

  const treeNodes = computed(() => rootItems.value.map(itemToTreeNode));

  return {
    active,
    get: (id: string) => data.get(id),
    rootItems,
    childrenItems,
    itemToTreeNode,
    treeNodes,
  };
});
