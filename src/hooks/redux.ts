import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";


export const useAppDispatch = useDispatch<AppDispatch>
//почемуто у него со стрелчной функцией написано
// const useAppDispatch = () => useDispatch<AppDispatch>()

//так селктор может подсказывать что у нас в стейте лежит
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
