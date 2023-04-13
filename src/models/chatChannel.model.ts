import { faker } from '@faker-js/faker';
import { ChannelPermissionsObject } from './permissions.enum';

export type ChatChannel = {
  _id: string;
  name: string;
  users: {
    uid: string;
    permissions: ChannelPermissionsObject;
  }[];
  defaultUserPermissions: ChannelPermissionsObject;
};

export const defaultChatChannel: ChatChannel = {
  _id: 'null',
  name: 'Unnamed',
  users: [],
  defaultUserPermissions: {},
};

export function generateFakeChatChannel(): ChatChannel {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.company.bsNoun(),
    users: [],
    defaultUserPermissions: {},
  };
}
