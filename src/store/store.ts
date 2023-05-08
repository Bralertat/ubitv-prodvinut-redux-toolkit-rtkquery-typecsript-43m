import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit"
import { userReducer } from "./reducers/UserSlice"
import { postAPI } from "../services/PostService"

//redux thunk-middleware уже включена к toolkit
//на деле для типов лучше использовать combineReducers, хотя toolkit, rootReducer может быть просто объектом, он сам запихнет его в combineReducers за кадром
const rootReducer = combineReducers({
  userReducer,
  //так добавляется редьюсер rtkQuery
  [postAPI.reducerPath]: postAPI.reducer
})

export const setupStore = () => {
  //это вместо createStore старого
  return configureStore({
    reducer: rootReducer,
    //rtkQuery обязательно подключить middleware
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(postAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore> //почему тут не вызов setupStore()???
//непонятно как он так dispatch вытягивает
export type AppDispatch = AppStore['dispatch']