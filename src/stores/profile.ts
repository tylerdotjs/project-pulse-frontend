import { defineStore } from 'pinia';
import {
  DefaultProfile,
  Profile,
  generateFakeProfile,
} from 'src/models/profile.model';
import ReactiveMap from 'src/models/reactiveMap.class';

export const useProfileStore = defineStore('profile', () => {
  const data = new ReactiveMap<Profile>(DefaultProfile);

  function fillFake(count: number) {
    for (let i = 0; i < count; i++) {
      data.add(generateFakeProfile());
    }
  }

  fillFake(4);

  return {
    get: (id: string) => data.get(id),
    getIds: () => data.getIds(),
    toReactiveArray: () => data.toReactiveArray(),
  };
});
