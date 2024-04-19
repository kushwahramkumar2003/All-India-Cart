// Use throughout your app instead of plain `useDispatch` and `useSelector`
import { AppDispatch, AppStore, RootState } from '@/store/store';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
