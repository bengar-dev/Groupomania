import { atom } from 'recoil'

export const displayDark = atom({
  key: 'displayDark',
  default: ''
})

export const stateDark = atom({
  key: 'stateDark',
  default: 0
})

export const switchDark = atom({
  key: 'switchDark',
  default: 'ml-0'
})
