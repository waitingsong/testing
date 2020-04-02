import { Observable, merge, of, from as ofrom, range } from 'rxjs'
import {
  mergeMap,
  tap,
  map,
  reduce,
} from 'rxjs/operators'

import { initNameSerials } from './helper'
import {
  NameMap,
  TreeNode,
  NameSerials,
  SerialNum,
} from './model'



export async function walkTreeWithType(rootTreeNode: TreeNode): Promise<NameMap> {
  const ret: NameMap = new Map()

  await walkTreeNode(rootTreeNode)
    .pipe(
      tap((node) => {
        updateNameMap(ret, node)
      }),
    )
    .toPromise()
    .catch((ex) => {
      throw ex
    })

  await updateNameMapRecycledAscSerial(ret)

  return ret
}

/** Update inline */
function updateNameMap(nameMap: NameMap, node: TreeNode): void {
  const { name, type } = node

  let nameSerials = nameMap.get(type)
  if (! nameSerials) {
    nameSerials = initNameSerials()
    nameMap.set(type, nameSerials)
  }

  const arr = name.split('_')
  let nameIdx = 0
  if (arr.length > 1) {
    nameIdx = +arr[arr.length - 1].trim()
  }
  if (nameIdx > 0) {
    // here is existing number, ignore dup,  revert and unique later
    nameSerials.recycledAscSerial.push(nameIdx)
  }

  if (nameIdx > nameSerials.currentSerial) {
    nameSerials.currentSerial = nameIdx
  }
}

function walkTreeNode(inputNode: TreeNode): Observable<TreeNode> {
  const node$ = of(inputNode).pipe(
    mergeMap((node) => {
      let ret$ = of(node)

      if (node.children && node.children.length) {
        const subNode$ = ofrom(node.children).pipe(
          mergeMap(subNode => walkTreeNode(subNode)),
        )
        ret$ = merge(
          ret$,
          subNode$,
        )
      }
      return ret$
    }, 2),
  )

  return node$
}


// inline update
async function updateNameMapRecycledAscSerial(nameMap: NameMap): Promise<void> {
  nameMap.forEach(async (nameSerials) => {
    nameSerials.recycledAscSerial = await updateRecycledAscSerial(nameSerials)
  })
}

function updateRecycledAscSerial(
  nameSerials: NameSerials,
): Promise<NameSerials['recycledAscSerial']> {

  const existingIdxMap = new Set(nameSerials.recycledAscSerial)
  const idx = nameSerials.currentSerial

  if (idx >= 2) {
    const range$ = range(1, idx)
    const ret$: Observable<NameSerials['recycledAscSerial']> = range$.pipe(
      map((index) => {
        return existingIdxMap.has(index) ? 0 : index
      }),
      reduce((acc: SerialNum[], curr: SerialNum) => {
        if (curr > 0) {
          acc.push(curr)
        }
        return acc
      }, []),
      map(arr => arr.sort((first, second) => first - second)),
      // tap((arr) => {
      //   console.info('result arr:', arr)
      // }),
    )
    return ret$.toPromise()
  }

  return Promise.resolve([])
}

