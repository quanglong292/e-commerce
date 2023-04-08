import { ORDER_WISH_ACTION_TYPES } from "./types";

const handleAddNewList = (origin = [], update = []) => {
  return [...origin, ...update].reduce((a, { id, count }) => {
    const exist = a.find((j) => j.id === id);
    if (exist) exist.count += count;
    else a.push({ id, count });

    return a;
  }, []);
};

export function reducer(state, action = {}) {
  if (action.type === ORDER_WISH_ACTION_TYPES.ADD_ORDER) {
    const ordersList = handleAddNewList(state.ordersList, action.payload);
    state.ordersList = ordersList;
  }

  if (action.type === ORDER_WISH_ACTION_TYPES.ADD_WISH) {
    const wishList = handleAddNewList(state.wishList, action.payload);
    state.wishList = wishList;
  }

  if (action.type === ORDER_WISH_ACTION_TYPES.REMOVE_ORDER) {
    state.wishList = state.wishList.filter((i) => i.id !== action.payload);
  }

  return state;
}
