import { ComputedRef, Ref, computed, ref } from 'vue';

export type ReactiveMapOptions<T> = {
  initial?: T[];
  get?: (id: string) => Promise<T>;
};

export default class ReactiveMap<T extends { _id: string }> {
  protected map = new Map<string, Ref<T>>();
  protected ids = ref<string[]>([]);
  protected options: ReactiveMapOptions<T>;
  defaultItem: T;

  constructor(defaultItem: T, options?: ReactiveMapOptions<T>) {
    this.options = options || {};
    if (options?.initial) options.initial.forEach(this.add);
    this.defaultItem = defaultItem;
  }

  get(id: string) {
    // Item is already cached
    if (this.map.has(id)) return this.map.get(id) as Ref<T>;

    // Item is not already cached
    // Temporality set item to default
    const item = this.add(this.defaultItem);

    // If a get function is set use the return value of the promise and overwrite the default value
    if (this.options.get) {
      this.options.get(id).then((res) => {
        item.value = res;
      });
    }
    return item;
  }

  addStart(item: T) {
    if (!this.ids.value.includes(item._id)) this.ids.value.unshift(item._id);

    const refItem = ref(item) as Ref<T>;
    this.map.set(item._id, refItem);
    return refItem;
  }

  add(item: T) {
    if (!this.ids.value.includes(item._id)) this.ids.value.push(item._id);

    const refItem = ref(item) as Ref<T>;
    this.map.set(item._id, refItem);
    return refItem;
  }

  clear() {
    this.ids.value = [];
    this.map.clear();
  }

  toReactiveArray() {
    return computed(() => {
      if (!this.ids || !this.ids.value) return [];
      return this.ids.value
        .map((id) => this.get(id)?.value)
        .filter((el) => el !== undefined);
    }) as ComputedRef<T[]>;
  }

  getIds() {
    return this.ids.value;
  }
}
