import { defineStore } from 'pinia';
import {
  DefaultProfile,
  Profile,
  generateFakeProfile,
} from 'src/models/profile.model';
import ReactiveMap from 'src/models/reactiveMap.class';
import { Ref, computed } from 'vue';

export const useProfileStore = defineStore('profile', () => {
  const data = new ReactiveMap<Profile>(DefaultProfile);

  function fillFake(count: number) {
    for (let i = 0; i < count; i++) {
      data.add(generateFakeProfile());
    }
  }

  fillFake(4);

  const reactiveSearch = (input: Ref<string>) =>
    computed<Profile[]>(() =>
      data.computedArray.value.filter(
        (profile) =>
          new RegExp('^' + input.value, 'i').test(profile.name) ||
          new RegExp(' ' + input.value, 'i').test(profile.name)
      )
    );

  return {
    get: (id: string) => data.get(id),
    ids: data.ids,
    computedArray: data.computedArray,
    reactiveSearch,
  };
});
