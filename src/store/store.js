import { configureStore } from "@reduxjs/toolkit"
// // import { compose, createStore, applyMiddleware } from "redux"
// // import { persistStore, persistReducer } from "redux-persist"
// // import storage from "redux-persist/lib/storage"
import logger from "redux-logger"

import { rootReducer } from "./root-reducer"

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
)

// // const composeEnhancer =
// //   (process.env.NODE_ENV !== "production" &&
// //     window &&
// //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
// //   compose

// // const persistConfig = {
// //   key: "root",
// //   storage,
// //   blacklist: ["user"],
// // }

// // const persistedReducer = persistReducer(persistConfig, rootReducer)

// // const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares))

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleWares),
  // Redux ToolKit comes with 3 middlewares by default: 1) Redux Thunks, 2) Serializable value checker, and 3)¿?.
  // If we pass custom middlewares as an array to RTK we will delete the 3 default middlewares and they will be
  // replaced by the custom ones. But we can pass a function in order to keep the default middlewares that we can to keep and
  // add our custom ones.
})

// // export const persistor = persistStore(store)
