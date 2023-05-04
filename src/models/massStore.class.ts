import { UnwrapNestedRefs, computed, reactive } from 'vue';

export abstract class MassStoreItem<T extends object = object> {
  protected _value?: T;
  id = 'null';

  loading = false;

  get value(): T | undefined {
    return this._value;
  }
  set value(val: T | undefined) {
    this._value = val;

    // Set of object is value has id
    if (!val) return;
    if ('id' in val && typeof val.id == 'string') {
      this.id = val.id;
    }
    if ('_id' in val && typeof val._id == 'string') {
      this.id = val._id;
    }
  }

  constructor(id: string) {
    this.id = id;
  }

  protected abstract pullFn(): Promise<T>;

  async pull() {
    // if item is already loading don't pull again
    if (this.loading) return;

    this.loading = true;
    try {
      const res = await this.pullFn();
      this.value = res;
    } catch {}
    this.loading = false;
  }

  set(item: typeof this) {
    this.id = item.id;
    this.value = item.value;
    return this;
  }
}

export abstract class MassStore<T extends MassStoreItem = MassStoreItem> {
  ids = reactive<string[]>([]);
  data = new Map<string, UnwrapNestedRefs<T>>();
  items = computed(() => this.ids.map((id) => this.get(id)));

  abstract createItem(id: string): T;

  setItem(item: T) {
    const reactiveItem = reactive(item);
    const storedItem = this.data.get(item.id);

    if (!this.ids.includes(item.id)) {
      // If item id is not present in ids array
      this.ids.push(item.id);
    }
    // Overwrite content of item or set new item in data map
    if (storedItem) {
      storedItem.set(item);
      return storedItem;
    } else {
      this.data.set(item.id, reactiveItem);
    }

    // Return new stored item
    return reactiveItem;
  }
  get(id: string) {
    const storedItem = this.data.get(id);

    if (storedItem) {
      return storedItem;
    } else {
      return this.setItem(this.createItem(id));
    }
  }
  async pull(id: string) {
    const item = this.get(id);

    const valueBefore = item.value;
    await item.pull();

    return { valueBefore, valueAfter: item.value };
  }
  pullAll() {
    for (const item of this.items.value) {
      item.pull();
    }
  }
  setItemIndex(id: string, index: number) {
    const currentIndex = this.ids.indexOf(id);
    const clampedNewIndex = Math.max(Math.min(index, this.ids.length - 1), 0);
    const item = this.data.get(id);

    if (!item || currentIndex < 0 || currentIndex == clampedNewIndex) return;

    // Remove id
    this.ids.splice(currentIndex, 1);

    // Add id back at new index
    this.ids.splice(clampedNewIndex, 0, id);
  }
  /**
   * Move item in order
   * @param id
   * @param index Move item by x places
   * @returns
   */
  moveItem(id: string, index: number) {
    const currentIndex = this.ids.indexOf(id);
    const clampedNewIndex = Math.max(
      Math.min(index + currentIndex, this.ids.length - 1),
      0
    );
    const item = this.data.get(id);

    if (!item || currentIndex < 0 || currentIndex == clampedNewIndex) return;

    // Remove id
    this.ids.splice(currentIndex, 1);

    // Add id back at new index
    this.ids.splice(clampedNewIndex, 0, id);
  }
}
