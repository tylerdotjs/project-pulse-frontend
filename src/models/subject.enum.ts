export const Subject = {
  English: 'english',
  Math: 'math',
  Science: 'science',
  History: 'history',
  Health: 'health',
} as const;

export type Subject = (typeof Subject)[keyof typeof Subject];

export default Subject;
