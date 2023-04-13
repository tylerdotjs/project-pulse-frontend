export const ChannelPermission = {
  Read: 'chat.read',
  Write: 'chat.write',
} as const;

export type ChannelPermission =
  (typeof ChannelPermission)[keyof typeof ChannelPermission];

export type ChannelPermissionsObject = {
  [permission in ChannelPermission]?: boolean;
};
