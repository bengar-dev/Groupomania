import { atom } from 'recoil'
//state gestion auth ( 0 = non auth / 1 = auth )
export const authState = atom({
  key: 'authState',
  default: 0
})