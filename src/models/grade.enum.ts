export const Grade = {
  'A+': 0.97,
  A: 0.93,
  'A-': 0.9,
  'B+': 0.87,
  B: 0.83,
  'B-': 0.8,
  'C+': 0.77,
  C: 0.73,
  'C-': 0.7,
  'D+': 0.67,
  D: 0.63,
  'D-': 0.6,
  F: 0,
} as const;

export type Grade = (typeof Grade)[keyof typeof Grade];

export default Grade;

export function percentToLetter(value: number): keyof typeof Grade {
  for (const letter in Grade) {
    if (value >= Grade[letter as keyof typeof Grade])
      return letter as keyof typeof Grade;
  }
  return 'F';
}
