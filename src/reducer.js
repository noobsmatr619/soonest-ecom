export let initialState = {
    cart: [],
    user: null
  };

  let reducer = (state, action) => {
 
    switch (action.type) {
         case "removeFromCart":
      let index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      ); 
      let newCart= [...state.cart];
      if (index>=0){
          newCart.splice(index,1);

      }
      else{
          window.alert(
            `Item (id: ${action.id}) unavailable in basket.Item not removed!`
          )
      }
      return {
        ...state,
        cart: newCart
      }
      case "inCart":
      // localStorage.setItem("myCart", JSON.stringify(action));
        return {
          ...state,
          cart: [...state.cart, action.item],
        };
        
         // event listener for set user here
         case "setUser":
          return {
            ...state,
            user: action.user
          }
    
        default:
          return state;
      }
      
       
    };
  export const getPriceTotal = (cart) => 
  cart?.reduce((initialval, item) => item.cost + initialval, 0);

export default reducer;
// also implement session storage later