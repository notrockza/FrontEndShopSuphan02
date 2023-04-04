import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CommunityGroup } from "../Model/CommunityGroup";
import { Result } from "../Model/Interfaces/IResponse";
import { ImageProduct } from "../Model/Product";
import { setCart } from "./cartSlice";
import { Order, OrderConfirmOrder, Paymemt } from "../Model/Order";

interface orderState{
    orders: Order[] | null;
    ordersSucceed: Order[] | null;
    ordersConfirm: Order[] | null;
    ordersLoaded: boolean;
    ordersSucceedLoaded: boolean;
    ordersConfirmLoaded: boolean;
}

const initialState : orderState= {
    orders: null,
    ordersSucceed: null,
    ordersConfirm: null,
    ordersLoaded : false,
    ordersSucceedLoaded : false,
    ordersConfirmLoaded : false

}


export const fetchOrderConfirm = createAsyncThunk<any>(
    'order/fetchOrderConfirm',
    async (_, thunkAPI) => {
        try {
            const data = await agent.Order.getConfirm();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const fetchOrderByIdAccountAsync = createAsyncThunk<Order[], any>("order/fetchOrderByIdAccountAsync",
    async (idAccount, thunkAPI) => {
        try {
            const result = await agent.Order.getByIdAccount(idAccount);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

    export const updateOrderAsync = createAsyncThunk<Paymemt[], any>("order/updateOrderAsync", async (value, thunkAPI) => {
        try {
          const result = await agent.Order.update(value);
          return result;
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      }
    );

    export const fetchConfirmOrderAccount = createAsyncThunk<Order[], any>("order/fetchConfirmOrderAccount",
    async (idAccount, thunkAPI) => {
        try {
            const result = await agent.Order.GetConfirmOrderAccount(idAccount);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

    export const updateConfirmOrders = createAsyncThunk<Order[], any>("order/updateConfirmOrder", async (value, thunkAPI) => {
        try {
          const result = await agent.Order.updateConfirmOrder(value);
          return result;
        } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
        }
      }
    );


   
export const orderSlice = createSlice({
    name: "CommunityGroup",
    initialState ,
    reducers:{
        // resetImageProduct: (state) => {
        //     state.orders = null;
        //     state.ordersLoaded = false;
        // }, 
    },
    extraReducers: (builder => {
        builder.addCase(fetchConfirmOrderAccount.fulfilled, (state, action) => {
            state.ordersSucceed = action.payload
            state.ordersConfirmLoaded = true
        });
        builder.addCase(fetchOrderByIdAccountAsync.fulfilled, (state, action) => {
            state.orders = action.payload;
            state.ordersLoaded = true;
        });
        builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
            state.ordersLoaded = true;
        });
        builder.addCase(updateConfirmOrders.fulfilled, (state, action) => {
            state.ordersLoaded = true;
        });
        builder.addCase(fetchOrderConfirm.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.ordersConfirm = action.payload.data;
            state.ordersConfirmLoaded = true
            // state.ordersConfirm = action.payload.data;
            // state.ordersConfirmLoaded = true
        });
    })

    
});

export const { } = orderSlice.actions




