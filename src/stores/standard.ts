import { defineStore } from 'pinia';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';
import { Standard, generateFakeStandard } from 'src/models/standard.model';

export class StandardItem extends MassStoreItem<Standard> {
  protected pullFn(): Promise<Standard> {
    throw new Error('Method not implemented.');
  }
}

export class StandardData extends MassStore<StandardItem> {
  protected createItem(id: string): StandardItem {
    return new StandardItem(id);
  }
}

export const useStandardStore = defineStore('standard', () => {
  const data = new StandardData();

  function populateFake(count: number) {
    for (let i = 0; i < count; i++) {
      const item = generateFakeStandard();
      data.addItem(item._id, item);
    }
  }

  populateFake(5);

  return {
    get: (id: string) => data.get(id),
    items: data.items,
  };
});
