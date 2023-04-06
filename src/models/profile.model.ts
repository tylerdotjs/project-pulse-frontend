import { faker } from '@faker-js/faker';

export type Profile = {
  _id: string;
  avatar: string;
  name: string;
};

export function generateFakeProfile(): Profile {
  return {
    _id: faker.database.mongodbObjectId(),
    avatar: faker.image.avatar(),
    name: faker.name.fullName(),
  };
}

export const DefaultProfile: Profile = {
  _id: 'null',
  avatar: 'null',
  name: 'null',
};
