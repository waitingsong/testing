import { basename } from '@waiting/shared-core'
import * as assert from 'power-assert'

import { groupBy, Student } from '../src/index'


const filename = basename(__filename)

const students: Student[] = [
  { name: '张三', score: 84 },
  { name: '李四', score: 58 },
  { name: '王五', score: 99 },
  { name: '赵六', score: 69 },
]

describe(filename, () => {

  describe('Should groupBy() works', () => {
    it('normal', async () => {
      const ret = groupBy(students)
      assert(ret.A.length + ret.B.length + ret.C.length === students.length)
      console.log(ret)
    })
  })

})

