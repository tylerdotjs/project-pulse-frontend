import { faker } from '@faker-js/faker';

export type Notification = {
  _id: string;
  body: string;
  timestamp: Date;
};

export const DefaultNotification = {
  _id: 'null',
  body: 'no data',
  timestamp: new Date(),
};

export function generateFakeNotification(): Notification {
  return {
    _id: faker.database.mongodbObjectId(),
    body: faker.commerce.productDescription(),
    timestamp: new Date(),
  };
}
