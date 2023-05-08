import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/IUser";
import { fetchUsers } from "./ActionCreators";

//в toolkit есть slice-s это дополнительная обертка наж редьюсерами
//используя слайсы больше ненужно дцмать про типы экшн криейторов и пр

interface UserState { //классика. нам всегда нужен сам запрос, идниктор загрузки, и обработка ошибки
  users: IUser[]
  isLoading: boolean
  error: string
  count: number
}

const initialState: UserState = {
  users: [],
  isLoading: false,
  error: '',
  count: 0
}

//создаем редьюсер, а точнее слайс
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //reducers это аналог switch-case для каждого экшена здесь как бы отдельный редьюсер
  reducers: {
    //в toolkit мы можем напрямую менять поля в стейте МУтабельность Mobx, больше ненужно разворачивать ...state каждый раз
    //раньше разворачивали чтоб ссылка у всего стейта поменялась - значит стейт изменился, а точнее заменился новым - иммутабельный подход
    //increment это редьюсер, но userSlice.actions.increment это уже настоящий экшн криейтор привызове возвращает объект с типом и пейлоадом
    // increment(state, action: PayloadAction<number>) {
    //   state.count += action.payload
    // },
    // usersFetching(state) {
    //   state.isLoading = true
    // },
    // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
    //   state.isLoading = false
    //   state.error = ''
    //   state.users = action.payload
    // },
    // usersFetchingError(state, action: PayloadAction<string>) {
    //   state.isLoading = false
    //   state.error = action.payload
    // }
  },
  //альтернатива для асинхронных санок в toolkit
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false
      state.error = ''
      state.users = action.payload
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    }
  }

})

export const userReducer = userSlice.reducer