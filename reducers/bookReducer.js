export default function bookReducer(state, action) {
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, action.item];
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.name !== action.product.name);
    default:
      return state;
  }
}
