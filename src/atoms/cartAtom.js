import {atom} from 'recoil'

export const cartAtom = atom({
    key:'cartItems',
    default:[]
})