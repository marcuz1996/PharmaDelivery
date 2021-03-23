const initialState = {
  addedItems: [],
  totalProduct: 0,
  total: 0.0,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const quantity = action.payload.quantity;
      const existed_item = state.addedItems.find(
        (item) => action.payload.product.id === item.id
      );
      const newTotalProduct = state.totalProduct + quantity;
      if (existed_item) {
        action.payload.product.quantity += quantity;
        return {
          ...state,
          totalProduct: newTotalProduct,
          total:
            state.total + parseFloat(action.payload.product.price) * quantity,
        };
      } else {
        action.payload.product.quantity = quantity;
        const newTotal =
          state.total + parseFloat(action.payload.product.price) * quantity;
        return {
          ...state,
          addedItems: [...state.addedItems, action.payload.product],
          totalProduct: newTotalProduct,
          total: newTotal,
        };
      }
    }
    case "ADD_QTY": {
      action.payload.quantity += 1;
      const newTotalProduct = state.totalProduct + 1;
      const newTotal = state.total + parseFloat(action.payload.price);
      return {
        ...state,
        totalProduct: newTotalProduct,
        total: newTotal,
      };
    }
    case "SUBTRACT_QTY": {
      if (action.payload.quantity > 1) {
        action.payload.quantity -= 1;
        const newTotalProduct = state.totalProduct - 1;
        const newTotal = state.total - parseFloat(action.payload.price);
        return {
          ...state,
          totalProduct: newTotalProduct,
          total: newTotal,
        };
      } else {
        return {
          ...state,
        };
      }
    }

    case "REMOVE_ITEM": {
      const new_items = state.addedItems.filter(
        (item) => action.payload.id !== item.id
      );
      const newTotalProduct = state.totalProduct - action.payload.quantity;
      const newTotal =
        state.total -
        parseFloat(action.payload.price) * action.payload.quantity;
      return {
        ...state,
        addedItems: new_items,
        totalProduct: newTotalProduct,
        total: newTotal,
      };
    }

    case "EMPTY_CART": {
      return initialState;
    }
  }
  return state;
};
