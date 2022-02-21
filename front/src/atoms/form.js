import { atom } from 'recoil'

export const formState = atom({
  key: 'stateForm',
  default: 0
})

export const msgForm = atom({
  key : 'stateMsgform',
  default : ''
})

export const passState = atom({
  key: 'statePass',
  default: 0
})

export const emailValue = atom({
  key: 'valueMail',
  default: ''
})

export const firstnameValue = atom({
  key: 'valueFirst',
  default: ''
})

export const lastnameValue = atom({
  key: 'valueLast',
  default: ''
})

export const passwordValue = atom({
  key: 'valuePass',
  default: ''
})

export const submitButton = atom({
  key: 'submitB',
  default: null
})

export const contenuPost = atom ({
  key: 'contenuP',
  default: ''
})
