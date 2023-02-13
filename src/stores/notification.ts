import { defineStore } from 'pinia';
import {
  Notification,
  generateFakeNotification,
} from '../models/notification.model';

export type NotificationStoreState = {
  items: Notification[];
};

export const useNotificationStore = defineStore('notification', {
  state: () =>
    ({
      items: [generateFakeNotification(), generateFakeNotification()],
    } as NotificationStoreState),

  getters: {},

  actions: {
    clear() {
      this.items = [];
    },
  },
});
