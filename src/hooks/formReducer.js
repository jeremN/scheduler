import { useReducer } from 'react';

const init = (initialState) => ({ ...initialState });

const reducer = (state, action) => {
  switch (action.type) {
    case 'form':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'reset':
      return init(action.payload)
    default:
      return
  }
}

const FormReducer = (initialState, reducer) => {
  const [state, dispatch] = useReducer(initialState, reducer)
  return [state, dispatch]
}

export { FormReducer, reducer }