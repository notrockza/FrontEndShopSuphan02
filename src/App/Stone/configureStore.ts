/* eslint-disable @typescript-eslint/no-unused-vars */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from './accountSlice';
import { addressSilce } from './addressSilce';
import { cratSlice } from './cartSlice';
import { CategorySilce } from './CategorySilce';
import { CommunityGroupSilce } from './CommunityGroupSilce';
import { detailProductSlice } from './detailProductSlice';
import { homeSlice } from './homeSlice';
import { LevelRaritySilce } from './LevelRaritySilce';
import { productSlice } from './productSlice';
import { ReviewSlice } from './ReviewSlice';
import { orderSlice } from './orderSlice';
import { reportSlice } from './reportSlice';
import { InformationSlice } from './InformationSlice';

export const store = configureStore({
    reducer: {
        account : accountSlice.reducer,
        product : productSlice.reducer,
        crat : cratSlice.reducer,
        home : homeSlice.reducer,
        communitygroup : CommunityGroupSilce.reducer,
        categoryproduct : CategorySilce.reducer,
        LevelRarity : LevelRaritySilce.reducer,
        review : ReviewSlice.reducer,
        address : addressSilce.reducer,
        detailProduct : detailProductSlice.reducer,
        order : orderSlice.reducer ,
        report : reportSlice.reducer,
        information: InformationSlice.reducer

    } ,
    
  });


//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>// อ่าน state ; ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

//สำหรับเรียกใข้ dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = ()=>useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;