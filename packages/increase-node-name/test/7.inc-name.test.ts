import { basename } from '@waiting/shared-core'
import * as assert from 'power-assert'
import { from as ofrom, defer } from 'rxjs'
import { concatMap, mergeMap, tap } from 'rxjs/operators'

import { getIncName, NodeType, initTreeMeta } from '../src/index'

import {
  tree0, names0,
  names1, tree1,
  names2, tree2,
  names3, tree3, names3err,
} from './test.config'
import { TestTreeRow } from './test.model'


const filename = basename(__filename)


describe(filename, () => {

  describe('Should getIncName() works', () => {
    it('normal', async () => {
      const arr: TestTreeRow[] = [
        [tree0, names0],
        [tree1, names1],
        [tree2, names2],
        [tree3, names3],
      ]

      await ofrom(arr)
        .pipe(
          concatMap(([tree, names], index) => {
            const init$ = defer(() => {
              return initTreeMeta(tree)
            })
            const stream$ = init$.pipe(
              concatMap(() => {
                return ofrom(Object.entries(names))
              }),
              concatMap((namesRow) => {
                const [nodeType, name] = namesRow
                const retName$ = defer(() => getIncName(nodeType as NodeType, tree))
                const ret$ = retName$.pipe(
                  tap((retName) => {
                    const data = {
                      index,
                      nodeType,
                      shouldName: name,
                      gotName: retName,
                    }
                    // console.log(data)
                    assert(retName && retName === name, `Should got data: ${JSON.stringify(data)}`)
                  }),
                )
                return ret$
              }),
            )

            return stream$
          }),
        )
        .toPromise()
        .catch((ex) => {
          throw ex
        })

      return
    })

    it('error', async () => {
      const arr: TestTreeRow[] = [ [tree3, names3err] ]

      await ofrom(arr)
        .pipe(
          concatMap(([tree, names], index) => {
            const init$ = defer(() => {
              return initTreeMeta(tree)
            })
            const stream$ = init$.pipe(
              concatMap(() => {
                return ofrom(Object.entries(names))
              }),
              concatMap((namesRow) => {
                const [nodeType, name] = namesRow
                const retName$ = defer(() => getIncName(nodeType as NodeType, tree))
                const ret$ = retName$.pipe(
                  tap((retName) => {
                    const data = {
                      index,
                      nodeType,
                      shouldName: name,
                      gotName: retName,
                    }
                    assert(retName && retName !== name, `Should got data: ${JSON.stringify(data)}`)
                  }),
                )
                return ret$
              }),
            )

            return stream$
          }),
        )
        .toPromise()
        .catch((ex) => {
          throw ex
        })

      return
    })
  })

})

