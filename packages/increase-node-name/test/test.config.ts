import { TreeNode, NodeType } from '../src/index'

import { TestNames } from './test.model'


export const tree0: TreeNode = {
  id: '1',
  type: 'View',
  name: 'view',
  children: [
    {
      id: '2',
      type: 'Button',
      name: 'button',
    },
    {
      id: '3',
      type: 'View',
      name: 'view_1',
      children: [
        {
          id: '4',
          type: 'Button',
          name: 'button_1',
        },
        {
          id: '5',
          type: 'View',
          name: 'view_2',
        },
      ],
    },
  ],
}
export const names0: TestNames = {
  Button: 'button_2',
  View: 'view_3',
}

export const tree1: TreeNode = {
  id: '1',
  type: 'View',
  name: 'view',
  children: [
    {
      id: '2',
      type: 'Button',
      name: 'button',
    },
    {
      id: '3',
      type: 'View',
      name: 'view_1',
      children: [
        {
          id: '5',
          type: 'View',
          name: 'view_3',
        },
      ],
    },
  ],
}
export const names1: TestNames = {
  Button: 'button_1',
  View: 'view_2',
}


export const tree2: TreeNode = {
  id: '1',
  type: 'View',
  name: 'view',
  children: [
    {
      id: '2',
      type: 'Button',
      name: 'button_3',
    },
    {
      id: '3',
      type: 'View',
      name: 'view_3',
    },
  ],
}
export const names2: TestNames = {
  Button: 'button_1',
  View: 'view_1',
}


export const tree3: TreeNode = {
  id: '1',
  type: 'View',
  name: 'view',
  children: [
    {
      id: '2',
      type: 'Button',
      name: 'button_1',
      children: [ { id: '4', type: 'Button', name: 'button_6' } ],
    },
    {
      id: '3',
      type: 'View',
      name: 'view_2',
      children: [ { id: '5', type: 'View', name: 'view_5' } ],
    },
  ],
}
export const names3: TestNames = {
  Button: 'button_2',
  View: 'view_1',
}
export const names3err: TestNames = {
  Button: 'button_1',
  View: 'view_2',
}

