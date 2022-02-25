import { atom } from 'recoil'

export const userInfo = atom({
  key: 'userInfo',
  default: []
})

export const userPublic = atom({
  key: 'userPublic',
  default: []
})
