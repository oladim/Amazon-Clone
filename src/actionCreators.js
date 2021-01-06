export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_USER = "SET_USER";


export function addToCart(item){
    return {
        type: "ADD_TO_CART", item
    }
}

export function removeFromCart(id){
    return {
        type: "REMOVE_FROM_CART", id
    }
}