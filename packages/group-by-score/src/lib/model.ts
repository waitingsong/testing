/* eslint-disable id-length */

export interface Student {
  name: string
  score: number
}

export enum ScoreGrade {
  A = 'A',
  B = 'B',
  C = 'C',
}

export type ScoreGradeKey = keyof typeof ScoreGrade
export type GroupByRet = {
  [key in ScoreGradeKey]: Student[]
}

