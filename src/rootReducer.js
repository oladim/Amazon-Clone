import {ADD_TO_CART, REMOVE_FROM_CART, SET_USER} from './actionCreators';


const initialState = {
    carts: [],
    id: 0,
    user: null
}

export const getBasketTotal = (currentCartItems) => {
   
      return  currentCartItems.reduce((amount, currVal) => currVal.price + amount, 0)
};

export default function rootReducer(state=initialState, action){
    
    switch(action.type){
        case ADD_TO_CART:
            let newState = {...state};
           
            return {
                ...state, carts: [...newState.carts, action.item]
            }
        case REMOVE_FROM_CART:
            // let newCarts = state.carts.filter(cartItem => cartItem.item.id !== action.id);
        
            // return {
            //     ...state, carts: newCarts
            // }
           
            const index = state.carts.findIndex(cartItem => cartItem.id === action.id);
           
            //console.log(index)
            let newCart = [...state.carts];
            index>=0? newCart.splice(index, 1) : console.log('warning')
            // if(index >= 0){
            //     newCart.splice(index, 1)
            // }
            // else{ console.log('warning')}
            console.log(newCart)
            return {
                ...state, carts: newCart
            }
            case SET_USER: 
           
            return {
                ...state, user: action.user
            }

            case 'EMPTY_CART':
                return{
                    ...state, carts: []
                }
        default: 
            return state;    
    }
}