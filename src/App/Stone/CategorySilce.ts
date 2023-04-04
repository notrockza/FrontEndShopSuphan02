import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CategoryProduct } from "../Model/CategoryProduct";
import { CommunityGroup } from "../Model/CommunityGroup";
import { setCart } from "./cartSlice";

interface Category{
    CategoryProducts: CategoryProduct[] | null,
    CategoryProductsloaded : boolean;
}

const initialState : Category= {
    CategoryProducts: null,
    CategoryProductsloaded : false
}


export const GetCategoryProduct = createAsyncThunk(
    'product/categoryproduct',
    async (_, thunkAPI) => {
        try {
            const data = await agent.ListCategory.GetCategory();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const CategorySilce = createSlice({
    name: "CommunityGroup",
    initialState ,
    reducers:{
        setCategoryProduct: (state, action) => {
            state.CategoryProducts = action.payload;
          },
    },
    extraReducers: (builder => {
        builder.addCase(GetCategoryProduct.fulfilled, (state, action) => {
            if (action.payload) {
                state.CategoryProducts = action.payload
                state.CategoryProductsloaded = true;
              }
        });
    })

    
});

export const { setCategoryProduct} = CategorySilce.actions




