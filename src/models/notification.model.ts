import { faker } from '@faker-js/faker';

export interface Notification {
  _id: string;
  body: string;
  timestamp: Date;
}

export function generateFakeNotification(): Notification {
  return {
    _id: faker.database.mongodbObjectId(),
    body: faker.lorem.words(1 + Math.round(Math.random()) * 10),
    timestamp: new Date(),
  };
}
