export const initialState = {
  basket: [],
  user: null,
};
//selector
export const getBasketTotal = (basket) =>
  basket.reduce((amount, item) => item.price + amount, 0);

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      /*       let newBasket = [...state.basket];
      let id = newBasket.findIndex((item) => item.id === action.item.id);
      if (id >= 0) {
        let existingItem = newBasket.splice(id, 1)[0];
        existingItem.qty = existingItem.qty + 1;
        console.log(existingItem.qty);
        newBasket.push(existingItem);
      } else {
        action.item.qty = 1;
        newBasket.push(action.item);
      }
      //console.log(newBasket); */
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];
      let id = newBasket.findIndex((item) => item.id === action.item.id);
      if (id >= 0) {
        newBasket.splice(id, 1);
      } else {
        console.warn(`Cannot remove a non existing item.`);
      }

      return {
        ...state,
        basket: newBasket,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
