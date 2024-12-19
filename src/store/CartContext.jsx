import { createContext, useReducer, useState } from "react";
export const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
})

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCartIemIndex = state.items.findIndex((item) => item.id === action.item.id)

        const updatedItems = [...state.items]
        if (existingCartIemIndex > -1) {
            const existingItem = state.items[existingCartIemIndex]
            const updatedItem = {
                ...existingItem, quantity: existingItem.quantity + 1
            }
            updatedItems[existingCartIemIndex] = updatedItem
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }

    }
    if (action.type === 'REMOVE_ITEM') {
        const existingCartIemIndex = state.items.findIndex((item) => item.id === action.id)

        const existingCartIem = state.items[existingCartIemIndex]
        const updatedItems = [...state.items]
        if (existingCartIem.quantity === 1) {

            updatedItems.splice(existingCartIemIndex, 1)
        } else {
            const updateItem = { ...existingCartIem, quantity: existingCartIem.quantity - 1 }
        }
        return { ...state, items: updatedItems }

    }
    return state
}
export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] })

    
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }
    function removeItem(id){
        dispatchCartAction({type:'REMOVE_ITEM',id})
    }

    const contextValue = {
        items: cart.items,
        addItem,
        removeItem
    }
    console.log(contextValue)
    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
}
export default CartContext