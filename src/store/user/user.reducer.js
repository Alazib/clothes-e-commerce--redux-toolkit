// import { USER_ACTION_TYPES } from "./user.types"
import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  currentUser: null,
}

//createSlice not only creates the reducer but also the actions and the action types!!! It returns an object for us.
// We don't need user.actions.js annd user.types.js anymore.
export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload // This looks like a mutation, but it is not. Under the hood Redux generates a new object, because
      // RTK leverages a library called Immer than ensures the inmutability.Remember: Redux is based on the INMUTABILITY OF STATES.
      //It generates a new object each time an action is passed trought it.
      //This will generate the action {type: user/setCurrentUser, payload: ...} which will be dispatched in App.js
      // IMPORTANT: The ENTIRE store continues reducing with each individual action !!!!!!! (as in pure Redux). So, createSelectors in order to
      // cache values still have sense to avoid useless re-renderings with each dispatched action on all the components that are consuming
      // the store with useSelector.
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export const userReducer = userSlice.reducer
