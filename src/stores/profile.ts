import { defineStore } from 'pinia';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';
import { Profile, generateFakeProfile } from 'src/models/profile.model';
import { Ref, computed } from 'vue';

export class ProfileItem extends MassStoreItem<Profile> {
  protected pullFn(): Promise<Profile> {
    throw new Error('Method not implemented.');
  }
}

export class ProfileData extends MassStore<ProfileItem> {
  createItem(id: string): ProfileItem {
    return new ProfileItem(id);
  }
}

export const useProfileStore = defineStore('profile', () => {
  const data = new ProfileData();

  function fillFake(count: number) {
    for (let i = 0; i < count; i++) {
      const fake = generateFakeProfile();
      data.addItem(fake._id, fake);
    }
  }

  fillFake(20);

  const reactiveSearch = (input: Ref<string>) =>
    computed(() =>
      data.items.value.filter(
        (profile) =>
          profile.data &&
          (new RegExp('^' + input.value, 'i').test(profile.data.name) ||
            new RegExp(' ' + input.value, 'i').test(profile.data.name))
      )
    );

  return {
    get: (id: string) => data.get(id),
    ids: data.ids,
    items: data.items,
    reactiveSearch,
  };
});
