import { faker } from '@faker-js/faker';
import { ProjectPermissionsObject } from './permissions.enum';
import { Standard } from './standard.model';

export type Project = {
  _id: string;
  users: {
    _id: string;
    permissions: ProjectPermissionsObject;
  }[];
  standards: Standard[];
  createdAt: Date;
};

export function generateFake({
  users,
  standards,
}: {
  users?: {
    _id: string;
    permissions: ProjectPermissionsObject;
  }[];
  standards?: Standard[];
}): Project {
  return {
    _id: faker.database.mongodbObjectId(),
    users: users || [],
    standards: standards || [],
    createdAt: new Date(),
  };
}

export const defaultProject: Project = {
  _id: 'null',
  users: [],
  standards: [],
  createdAt: new Date(),
};
