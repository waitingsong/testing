import {
  NodeType,
  NameMap,
  SerialNum,
  NameSerials,
} from './model'


export function getAvalibleNameSerial(
  nodeType: NodeType,
  nameMap: NameMap,
): SerialNum {

  let next = retrieveNameSerialFromRecycled(nodeType, nameMap)
  if (next === null) {
    next = retrieveNameSerialFromCurrent(nodeType, nameMap)
  }
  return next
}

export function updateRecycledAscSerial(
  nodeType: NodeType,
  nameMap: NameMap,
  index: SerialNum,
): void {

  if (! index || index < 1) {
    throw new RangeError('Invalid range value of index.')
  }

  const nameSerials = nameMap.get(nodeType)
  if (! nameSerials) {
    throw new Error('Value of nameSerials invalid.')
  }
  const newRecycled = insertSerialNumToRecycledAsc(nameSerials.recycledAscSerial, index)
  nameSerials.recycledAscSerial = newRecycled
  nameMap.set(nodeType, nameSerials)
}


function insertSerialNumToRecycledAsc(
  arr: NameSerials['recycledAscSerial'],
  index: SerialNum,
): NameSerials['recycledAscSerial'] {

  arr.push(index)
  return arr
}

function retrieveNameSerialFromRecycled(
  nodeType: NodeType,
  nameMap: NameMap,
): SerialNum | null {

  const nameSerials = nameMap.get(nodeType)

  if (nameSerials && nameSerials.recycledAscSerial.length) {
    const idx = nameSerials.recycledAscSerial.shift()
    return idx && idx > 0 ? idx : null
  }
  return null
}

function retrieveNameSerialFromCurrent(
  nodeType: NodeType,
  nameMap: NameMap,
): SerialNum {

  let nameSerials = nameMap.get(nodeType)
  if (! nameSerials) {
    nameSerials = initNameSerials()
    nameMap.set(nodeType, nameSerials)
    return nameSerials.currentSerial // zero
  }
  const next = nameSerials.currentSerial + 1
  nameSerials.currentSerial = next
  nameMap.set(nodeType, nameSerials)

  return next
}

export function initNameSerials(): NameSerials {
  const ret = {
    recycledAscSerial: [],
    currentSerial: 0,
  }
  return ret
}

