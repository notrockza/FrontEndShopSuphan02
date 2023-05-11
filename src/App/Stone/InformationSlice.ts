import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CategoryProduct } from "../Model/CategoryProduct";
import { CommunityGroup } from "../Model/CommunityGroup";
import { setCart } from "./cartSlice";
import { Information } from "../Model/Information";

interface Category{
    information: Information[] | null,
    informationloaded : boolean,
    informationDetail: Information | null,
    informationDetailloaded : boolean;
}

const initialState : Category= {
    information: null,
    informationloaded : false,
    informationDetail: null,
    informationDetailloaded : false
}


export const GetInformationAll = createAsyncThunk(
    'information/GetInformationAll',
    async (_, thunkAPI) => {
        try {
            const data = await agent.Information.getInformatonAll();
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const GetInformationDetail = createAsyncThunk<any, number>(
    'information/GetInformationDetail',
    async (id, thunkAPI) => {
        try {
            return await agent.Information.details(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)

export const DeletInformation = createAsyncThunk<any, number>(
    "product/deletProduct", 
    async (id, thunkAPI) => {
    try {
        const results = await agent.Information.delete(id);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});


export const InformationSlice = createSlice({
    name: "CommunityGroup",
    initialState ,
    reducers:{
        // setCategoryProduct: (state, action) => {
        //     state.CategoryProducts = action.payload;
        //   },
    },
    extraReducers: (builder => {
        builder.addCase(GetInformationAll.fulfilled, (state, action) => {
            if (action.payload.msg === "OK") 
                state.information = action.payload.data
                state.informationloaded = true;
              
        });
        builder.addCase(GetInformationDetail.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.informationDetail = action.payload.data;
            state.informationDetailloaded = true
          });
    })
    

    
});

export const { } = InformationSlice.actions




