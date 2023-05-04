import { defineStore } from 'pinia';
import {
  Notification,
  generateFakeNotification,
} from '../models/notification.model';
import { MassStore, MassStoreItem } from 'src/models/massStore.class';

export class NotificationItem extends MassStoreItem<Notification> {
  protected pullFn(): Promise<Notification> {
    throw new Error('Method not implemented.');
  }
}

export class NotificationData extends MassStore<NotificationItem> {
  createItem(id: string): NotificationItem {
    return new NotificationItem(id);
  }
  clear() {
    this.ids = [];
    this.data.clear();
  }
}

export const useNotificationStore = defineStore('notification', () => {
  const data = new NotificationData();

  function fillWithDummy(count: number) {
    for (let i = 0; i < count; i++) {
      const fake = generateFakeNotification();
      const item = new NotificationItem(fake._id);
      item.value = fake;
      data.setItem(item);
    }
  }

  fillWithDummy(3);

  setInterval(() => {
    const fake = generateFakeNotification();
    const item = new NotificationItem(fake._id);
    item.value = fake;
    data.setItem(item);
  }, 10000);

  return {
    clear: () => data.clear(),
    get: (id: string) => data.get(id),
    items: data.items,
  };
});
