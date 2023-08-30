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
      console.log("USER")
      state.currentUser = action.payload // This looks like a mutation, but it is not. Under the hood Redux generates a new object, because
      // RTK leverages a library called Immer than ensures the inmutability.Remember: Redux is based on the INMUTABILITY OF STATES.
      //It generates a new object each time an action is passed trought it.
      //This will generate the action {type: user/setCurrentUser, payload: ...} which will be dispatched in App.js
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export const userReducer = userSlice.reducer
