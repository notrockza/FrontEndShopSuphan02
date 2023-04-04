import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CommunityGroup } from "../Model/CommunityGroup";
import { Result } from "../Model/Interfaces/IResponse";
import { ImageProduct } from "../Model/Product";
import { setCart } from "./cartSlice";

interface DetailProductState{
    imageProducts: ImageProduct[] | null;
    imageProductLoaded: boolean;
}

const initialState : DetailProductState= {
    imageProducts: null,
    imageProductLoaded : false

}


export const fetchImageProductsAsync = createAsyncThunk<ImageProduct[], any>(
    'product/fetchImageProductsAsync',
    async (idProduct, thunkAPI) => {
        try {
            const result = await agent.ImageProduct.get(idProduct);
            const images = result.data;
            return images;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const createDetailProductAsync = createAsyncThunk<Result, any>("detailProduct/createDetailProductAsync",
    async (values, thunkAPI) => {
        try {
            return await agent.ImageProduct.create(values);
          
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

    export const removeImageProductAsync = createAsyncThunk<ImageProduct, any>(
      "detailProduct/removeDetailProductAsync",
      async (ID, thunkAPI) => {
        try {
          const result = await agent.ImageProduct.delete(ID);
          return result;
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      }
    );



export const detailProductSlice = createSlice({
    name: "CommunityGroup",
    initialState ,
    reducers:{
        resetImageProduct: (state) => {
            state.imageProducts = null;
            state.imageProductLoaded = false;
        },
    },
    extraReducers: (builder => {
        builder.addCase(fetchImageProductsAsync.fulfilled, (state, action) => {
            state.imageProducts = action.payload;
            state.imageProductLoaded = true;
        });
    })

    
});

export const { resetImageProduct} = detailProductSlice.actions




