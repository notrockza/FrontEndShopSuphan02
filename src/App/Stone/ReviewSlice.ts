import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CategoryProduct } from "../Model/CategoryProduct";
import { CommunityGroup } from "../Model/CommunityGroup";
import { Review } from "../Model/Review";
import { setCart } from "./cartSlice";

interface Reviews{
     Reviews : Review[] | null,
     ReviesLoaded : boolean
}

const initialState : Reviews= {
    Reviews: null,
    ReviesLoaded : false
}


export const GetReviewProduct = createAsyncThunk<any, number>(
    'review/GetReview',
    async (idProduct, thunkAPI) => {
        try {
            return await agent.Review.Get(idProduct);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)



export const ReviewSlice = createSlice({
    name: "Reviwe",
    initialState ,
    reducers:{
        // setCategoryProduct: (state, action) => {
        //     state.CategoryProducts = action.payload;
        //   },
    },
    extraReducers: (builder => {
        builder.addCase(GetReviewProduct.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.Reviews = action.payload.data;
            state.ReviesLoaded = true
          });
    })


    
});

export const { } = ReviewSlice.actions




