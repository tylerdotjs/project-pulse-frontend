import { ComputedRef, Ref, computed } from 'vue';
import ReactiveMap, { ReactiveMapOptions } from './reactiveMap.class';

export class ReactiveMapPopulate<
  B extends { _id: string },
  P
> extends ReactiveMap<B> {
  populateFn: (item: Ref<B>) => ComputedRef<P>;
  populatedComputedArray: ComputedRef<P[]>;

  constructor(
    populateFn: (item: Ref<B>) => ComputedRef<P>,
    defaultItem: B,
    options?: ReactiveMapOptions<B>
  ) {
    super(defaultItem, options);
    this.populateFn = populateFn;

    this.populatedComputedArray = computed<P[]>(
      () =>
        this.ids.value
          .map((id) => this.getPopulated(id)?.value)
          .filter((el) => el !== undefined) as P[]
    );
  }
  getPopulated(id: string): ComputedRef<P> | undefined {
    const item = this.get(id);
    if (!item) return;

    return this.populateFn(item);
  }
}
