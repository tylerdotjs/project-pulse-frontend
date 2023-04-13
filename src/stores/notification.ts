import { defineStore } from 'pinia';
import {
  DefaultNotification,
  Notification,
  generateFakeNotification,
} from '../models/notification.model';
import ReactiveMap from 'src/models/reactiveMap.class';

export const useNotificationStore = defineStore('notification', () => {
  const data = new ReactiveMap<Notification>(DefaultNotification);

  function fillWithDummy(count: number) {
    for (let i = 0; i < count; i++) {
      data.add(generateFakeNotification());
    }
  }

  fillWithDummy(3);

  setInterval(() => {
    data.add(generateFakeNotification());
  }, 10000);

  return {
    clear: () => data.clear(),
    get: (id: string) => data.get(id),
    computedArray: data.computedArray,
  };
});
