import { basename } from '@waiting/shared-core'
import * as assert from 'power-assert'
import { range } from 'rxjs'
import { mergeMap, map } from 'rxjs/operators'

import { findNodeById, TreeNode } from '../src/index'


const filename = basename(__filename)

interface Nodes {
  [key: string]: TreeNode
}
const nodes: Nodes = {
  tree1: {
    id: '1',
    label: 'firest',
  },
  tree2: {
    id: '2',
    label: 'second',
  },
  tree3: {
    id: '3',
    label: 'third',
  },
  tree4: {
    id: '4',
    label: 'fourth',
  },
  tree5: {
    id: '5',
    label: 'fifth',
  },
}

const tree: TreeNode = {
  ...nodes.tree1,
  children: [
    nodes.tree2,
    {
      ...nodes.tree3,
      children: [
        nodes.tree4,
        nodes.tree5,
      ],
    },
  ],
}

describe(filename, () => {

  describe('Should findNodeById() works', async () => {
    it('normal', async () => {
      const range$ = range(-1, 10)

      await range$.pipe(
        map(index => index.toString()),
        mergeMap((id: string) => {
          const node$ = findNodeById(tree, id)

          return node$.pipe(
            map(node => ({ id, node })),
          )
        }),
        map(({ id, node }) => {
          const key = `tree${id}`
          const src = nodes[key]

          console.info(`testing id: "${id}"`)
          if (src) {
            assert(node && node.id === src.id)
            assert(node && node.label === src.label)
            const row = node as TreeNode
            console.info('result: ', {
              id: row.id,
              label: row.label,
            }, '\n')
          }
          else {
            assert(node === null)
          }
        }),
      )
        .toPromise()
        .catch((ex) => {
          assert(false, ex.toString())
        })
    })
  })

})

