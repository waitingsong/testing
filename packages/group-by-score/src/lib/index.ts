import {
  Student,
  GroupByRet,
  ScoreGrade,
  ScoreGradeKey,
} from './model'


export function groupBy(data: Student[]): GroupByRet {
  valiateData(data)
  const ret: GroupByRet = {
    [ScoreGrade.A]: [],
    [ScoreGrade.B]: [],
    [ScoreGrade.C]: [],
  }

  data.forEach((row) => {
    const grade = getGrade(row.score)
    ret[grade] = insertRowToArrWithDescOrder(row, ret[grade])
  })

  return ret
}

function valiateData(data: unknown): void {
  if (Array.isArray(data) && data.length > 0) {
    return
  }
  else {
    throw new TypeError('Invalid input data, should array and contains element')
  }
}

function getGrade(score: number): ScoreGradeKey {
  if (typeof score !== 'number') {
    throw new TypeError(`Invalid typeof score value: "${score}"`)
  }
  else if (score > Number.MAX_VALUE) {
    throw new RangeError(`Invalid range of score value: "${score}"`)
  }
  else if (score < Number.MIN_VALUE) {
    throw new RangeError(`Invalid range of score value: "${score}"`)
  }

  const ret = score < 60
    ? ScoreGrade.C
    : score < 80
      ? ScoreGrade.B
      : ScoreGrade.A

  return ret
}

function insertRowToArrWithDescOrder(newRow: Student, arr: Student[]): Student[] {
  for (let i = 0, len = arr.length; i < len; i += 1) {
    const row = arr[i]
    if (newRow.score >= row.score) {
      if (i === 0) {
        return [newRow].concat(arr)
      }
      else {
        const arr1 = arr.slice(0, i - 1)
        const arr2 = arr.slice(i)
        return arr1.concat([newRow]).concat(arr2)
      }
    }
  }

  return arr.concat([newRow])
}
