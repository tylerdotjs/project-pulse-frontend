import { faker } from '@faker-js/faker';
import { Profile } from './profile.model';

export type MessageBase = {
  _id: string;
  channelId: string;
  sender: string;
  text: string;
  createdAt: Date;
};

export type Message = Omit<MessageBase, 'sender'> & {
  sender: Profile;
};

export const DefaultMessage: MessageBase = {
  _id: 'null',
  channelId: 'null',
  sender: 'null',
  text: 'No Test',
  createdAt: new Date(),
};

export function generateFakeMessageBase(
  profile?: string,
  channelId?: string
): MessageBase {
  return {
    _id: faker.database.mongodbObjectId(),
    channelId: channelId || faker.database.mongodbObjectId(),
    sender: profile || '',
    text: faker.lorem.paragraph(),
    createdAt: new Date(),
  };
}
