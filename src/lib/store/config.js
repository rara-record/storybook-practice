import { useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slice/todoSlice";

// reducer 병합
const rootReducer = combineReducers({
  Todo: TodoSlice.reducer,
});

const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

// useSelector나 useDispatch를 매번 설정하지 않고 애플리케이션 전역에서 사용이 가능
export const useAppSelector = useSelector;
export const useAppDispatch = () => useDispatch();

export default store;
