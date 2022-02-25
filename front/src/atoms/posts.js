import { atom } from 'recoil'

export const displayPosts = atom({
  key: 'displayPos',
  default: []
})

export const displayCmts = atom({
  key: 'displayCms',
  default: []
})

export const cmtsValue = atom({
  key: 'cmtsValue',
  default: ''
})

export const editState = atom ({
  key: 'editState',
  default: 0
})

export const msgValue = atom({
  key: 'msgState',
  default: ''
})

export const cmtState = atom({
  key: 'cmtState',
  default : 0
})

export const imgValue = atom({
  key: 'imgValue',
  default : null
})

export const imgTemp = atom({
  key: 'imgTemp',
  default: ''
})

export const imgTempMsg = atom({
  key: 'imgTempMsg',
  default: null
})

export const maxDisplay = atom({
  key: 'maxDisplay',
  default: 3
})
