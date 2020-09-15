export const initialState = null;

// Whenever state changes, component will re-render
export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  }
  return state;
};
