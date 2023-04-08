import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer as orderReducer } from "./order.reducer";
import { ORDER_WISH_ACTION_TYPES } from "./types";

const getActionType = (type) => type?.split("_")[1];
const checkAction = (constants, type) =>
  constants.FILTER_TYPE.includes(getActionType(type));

const initState = {
  ordersList: [],
  wishList: [],
  count: 0,
};

export function reducer(state, action = {}) {
  if (checkAction(ORDER_WISH_ACTION_TYPES, action.type)) {
    return {
      ...state,
      ...orderReducer(state, action),
    };
  }

  return { ...state };
}

const StoreContext = createContext(null);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useMyState must be used within a MyStateProvider");
  }
  return context;
};

// Create provider component
export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  return (
    <StoreContext.Provider value={{ storeState: state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
