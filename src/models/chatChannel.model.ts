import { faker } from '@faker-js/faker';
import { ChannelPermissionsObject } from './permissions.enum';

export type ChatChannel = {
  _id: string;
  parent: string;
  name: string;
  users: {
    uid: string;
    permissions: ChannelPermissionsObject;
  }[];
  defaultUserPermissions: ChannelPermissionsObject;
};

export const defaultChatChannel: ChatChannel = {
  _id: 'null',
  parent: '',
  name: 'Unnamed',
  users: [],
  defaultUserPermissions: {},
};

export function generateFakeChatChannel(parent?: string): ChatChannel {
  return {
    _id: faker.database.mongodbObjectId(),
    parent: parent || '',
    name: faker.company.bsNoun(),
    users: [],
    defaultUserPermissions: {},
  };
}
