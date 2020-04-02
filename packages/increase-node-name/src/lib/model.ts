/* eslint-disable id-length */

export type NodeType = 'View' | 'Button'

// export enum NodeType {
//   View = 'View',
//   Button = 'Button',
// }
export interface TreeNode {
  id: string
  name: string
  type: NodeType
  children?: TreeNode[]
}

export type GlobalTreeMap = WeakMap<TreeNode, TreeMeta>
export interface TreeMeta {
  nameMap: NameMap
}
export type NameMap = Map<NodeType, NameSerials>
export interface NameSerials {
  recycledAscSerial: SerialNum[]
  currentSerial: SerialNum
}
export type SerialNum = number

