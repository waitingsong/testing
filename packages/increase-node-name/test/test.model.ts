import { NodeType, TreeNode } from '../src'


export type TestNames = {
  [nodeType in NodeType]: string
}
export type TestTreeRow = [TreeNode, TestNames]

