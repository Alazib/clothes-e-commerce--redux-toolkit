import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import logger from "redux-logger"
import { rootReducer } from "./root-reducer"
import { persistStore, persistReducer } from "redux-persist"

const middleWares = [process.env.NODE_ENV === "development" && logger].filter(
  Boolean
)

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "categories"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleWares),

  // Redux ToolKit comes with 3 middlewares by default: 1) Redux Thunks, 2) Serializable value checker, and 3)¿?.
  // If we pass custom middlewares as an array to RTK we will delete the 3 default middlewares and they will be
  // replaced by the custom ones. But we can pass a function in order to keep the default middlewares that we can to keep and
  // add our custom ones.
  // RTK always bring by default the compatibility with DevTools
})

export const persistor = persistStore(store)
