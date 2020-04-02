import { globalTreeMap } from './config'
import { getAvalibleNameSerial } from './helper'
import {
  NodeType,
  TreeNode,
  SerialNum,
  TreeMeta,
} from './model'
import { walkTreeWithType } from './node-helper'


export async function getIncName(
  nodeType: NodeType,
  rootTreeNode: TreeNode,
): Promise<string> {

  let treeMeta = globalTreeMap.get(rootTreeNode)
  if (! treeMeta) {
    treeMeta = await initTreeMeta(rootTreeNode)
  }

  const idx = getAvalibleNameSerial(nodeType, treeMeta.nameMap)
  const ret = genNameFromTypeAndSerial(nodeType, idx)

  return ret
}


export async function initTreeMeta(rootTreeNode: TreeNode): Promise<TreeMeta> {
  const ret: TreeMeta = {
    nameMap: await walkTreeWithType(rootTreeNode),
  }
  globalTreeMap.set(rootTreeNode, ret)
  // console.log(ret.nameMap)
  return ret
}

function genNameFromTypeAndSerial(
  nodeType: NodeType,
  index: SerialNum,
): string {

  const name = nodeType.toLocaleLowerCase()
  const ret = index > 0
    ? `${name}_${index}`
    : name

  return ret
}

