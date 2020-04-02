import { Observable, merge, of, from as ofrom } from 'rxjs'
import {
  defaultIfEmpty,
  mergeMap,
  filter,
  first,
  // tap,
} from 'rxjs/operators'

import { TreeNode } from './model'


export function findNodeById(root: TreeNode, id: string): Observable<TreeNode | null> {
  const ret$ = walkTreeNode(root).pipe(
    // tap((node) => {
    //   console.info(node)
    // }),
    filter(node => isNodeMatchById(node, id)),
    defaultIfEmpty<TreeNode | null>(null),
    first(),
  )

  return ret$
}

function isNodeMatchById(node: TreeNode, id: string): boolean {
  return !! (node && node.id === id)
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

