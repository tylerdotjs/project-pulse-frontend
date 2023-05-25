import { faker } from '@faker-js/faker';
import Subject from './subject.enum';
export type Standard = {
  _id: string;
  subject: Subject;
  code: string;
  title: string;
  description: string;
};

export function generateFakeStandard(): Standard {
  const subjectKeys = Object.keys(Subject);
  return {
    _id: faker.database.mongodbObjectId(),
    subject:
      Subject[
        subjectKeys[
          Math.round((subjectKeys.length - 1) * Math.random())
        ] as keyof typeof Subject
      ],
    code: faker.finance.currencyCode(),
    title: faker.commerce.product(),
    description: faker.commerce.productDescription(),
  };
}
