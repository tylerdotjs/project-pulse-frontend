import { faker } from '@faker-js/faker';
import { Profile } from './profile.model';

export type MessageBase = {
  _id: string;
  sender: string;
  text: string;
  createdAt: Date;
};

export type Message = {
  _id: string;
  sender: Profile;
  text: string;
  createdAt: Date;
};

export const DefaultMessage: MessageBase = {
  _id: 'null',
  sender: 'null',
  text: 'No Test',
  createdAt: new Date(),
};

export function generateFakeMessageBase(profile?: string): MessageBase {
  return {
    _id: faker.database.mongodbObjectId(),
    sender: profile || '',
    text: faker.lorem.paragraph(),
    createdAt: new Date(),
  };
}
