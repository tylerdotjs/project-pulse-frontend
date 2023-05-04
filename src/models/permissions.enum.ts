export const ChannelPermission = {
  Read: 'chat.read',
  Write: 'chat.write',
} as const;

export type ChannelPermission =
  (typeof ChannelPermission)[keyof typeof ChannelPermission];

export type ChannelPermissionsObject = {
  [permission in ChannelPermission]?: boolean;
};

export const ProjectPermission = {
  Owner: 'project.owner',
  Read: 'project.read',
  Write: 'project.write',
} as const;

export type ProjectPermission =
  (typeof ProjectPermission)[keyof typeof ProjectPermission];

export type ProjectPermissionsObject = {
  [permission in ProjectPermission]?: boolean;
};
