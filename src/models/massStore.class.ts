import { UnwrapNestedRefs, computed, reactive, ref } from 'vue';

export abstract class MassStoreItem<T extends object = object> {
  protected _data?: T;
  id = 'null';

  readonly loading = ref(false);

  get data() {
    return this._data;
  }
  set data(value) {
    this._data = value;

    // Set of object is value has id
    if (!value) return;
    if ('id' in value && typeof value.id == 'string') {
      this.id = value.id;
    }
    if ('_id' in value && typeof value._id == 'string') {
      this.id = value._id;
    }
  }

  constructor(id?: string) {
    this.id = id || 'null';
  }

  protected abstract pullFn(): Promise<T>;

  async pull() {
    // if item is already loading don't pull again
    if (this.loading.value) return;

    this.loading.value = true;
    try {
      const res = await this.pullFn();
      this.data = res;
    } catch {}
    this.loading.value = false;
  }

  set(item: typeof this) {
    this.id = item.id;
    this.data = item.data;
    return this;
  }
}

export abstract class MassStore<T extends MassStoreItem = MassStoreItem> {
  readonly ids = reactive<string[]>([]);
  readonly data = new Map<string, UnwrapNestedRefs<T>>();
  readonly items = computed(() => this.ids.map((id) => this.get(id)));

  protected abstract createItem(id: string): T;

  addItem(id: string, value?: T['data']) {
    const item = this.createItem(id);
    if (value) item.data = value;

    return this.setItem(item);
  }

  setItem(item: T) {
    const reactiveItem = reactive(item);
    const storedItem = this.data.get(reactiveItem.id);

    if (!this.ids.includes(reactiveItem.id)) {
      // If item id is not present in ids array
      this.ids.push(reactiveItem.id);
    }
    // Overwrite content of item or set new item in data map
    if (storedItem) {
      storedItem.set(item);
      return storedItem;
    } else {
      this.data.set(reactiveItem.id, reactiveItem);
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

    const valueBefore = item.data;
    await item.pull();

    return { valueBefore, valueAfter: item.data };
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
