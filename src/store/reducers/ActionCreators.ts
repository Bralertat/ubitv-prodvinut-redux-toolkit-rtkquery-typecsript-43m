import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { CatchClause } from "typescript"
import { IUser } from "../../models/IUser"
import { AppDispatch } from "../store"
import { userSlice } from "./UserSlice"

//для асинхронных экшинов обычно испльзуют мидлваре санки но в toolkit всё под капотом

//делаем санку
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching())
//     //в чем прелесть axios он не возвращает ненужные нам коды и тд, а только data
//     const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//     dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//   } catch (error: any) {
//     dispatch(userSlice.actions.usersFetchingError(error.message))
//     alert(error)
//   }
// }

//альтернатывный подход toolkit, само создает 3 состояния которые потом обрабатываются в extraReducers
export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>('https://qjsonplaceholder.typicode.com/users')
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(`Не удалось загрузить ${e}`)
    }
  }
)