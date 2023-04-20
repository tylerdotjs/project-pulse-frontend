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
  children: string[];
  root: boolean;
};

export type PopulatedChatChannel = Omit<ChatChannel, 'children'> & {
  children: ChatChannel[];
};

export const defaultChatChannel: ChatChannel = {
  _id: 'null',
  name: 'Unnamed',
  users: [],
  defaultUserPermissions: {},
  children: [],
  root: true,
};

export function generateFakeChatChannel(
  isChild?: boolean,
  children?: string[]
): ChatChannel {
  return {
    _id: faker.database.mongodbObjectId(),
    name: faker.company.bsNoun(),
    users: [],
    defaultUserPermissions: {},
    children: children || [],
    root: !isChild,
  };
}
