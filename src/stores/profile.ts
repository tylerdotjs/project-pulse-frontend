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
      const item = new ProfileItem(fake._id);
      item.value = fake;
      data.setItem(item);
    }
  }

  fillFake(4);

  const reactiveSearch = (input: Ref<string>) =>
    computed(() =>
      data.items.value.filter(
        (profile) =>
          profile.value &&
          (new RegExp('^' + input.value, 'i').test(profile.value.name) ||
            new RegExp(' ' + input.value, 'i').test(profile.value.name))
      )
    );

  return {
    get: (id: string) => data.get(id),
    ids: data.ids,
    items: data.items,
    reactiveSearch,
  };
});
