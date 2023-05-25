import { faker } from '@faker-js/faker';
import { ProjectPermissionsObject } from './permissions.enum';
import { Standard } from './standard.model';

export type Project = {
  _id: string;
  title: string;
  description: string;
  users: {
    _id: string;
    permissions: ProjectPermissionsObject;
  }[];
  standards: {
    id: string;
    influence: number;
    score?: number;
  }[];
  createdAt: Date;
};

export function generateFake({
  users,
}: {
  users?: {
    _id: string;
    permissions: ProjectPermissionsObject;
  }[];
  standards?: Standard[];
}): Project {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    users: users || [],
    standards: [],
    createdAt: new Date(),
  };
}
