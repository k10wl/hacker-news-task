export const initialState = {
  news: null,
  newest: null,
}

export function reducer(state, action) {
  switch ( action.type ) {
    case "ADD_DATA":
      return ({
        ...state,
        [action.payload.target]: [action.payload.data],
      })
  }
}
