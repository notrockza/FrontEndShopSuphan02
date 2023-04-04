import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { Address, CreateAddress } from "../Model/Address";
import { CategoryProduct } from "../Model/CategoryProduct";
import { CommunityGroup } from "../Model/CommunityGroup";
import { Result } from "../Model/Interfaces/IResponse";
import { setCart } from "./cartSlice";
import { RootState } from "./configureStore";

interface Addresses{
    address: Address[] | null,
    addressloaded : boolean;
}

const initialState : Addresses= {
    address: null,
    addressloaded : false
}



export const GetAddressAll = createAsyncThunk<Address[], number>(
    'address/GetAddressAll',
    async (idAccount, thunkAPI) => {
        try {
            return await agent.Address.Get(idAccount);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)

export const createAddressAsync = createAsyncThunk<any, CreateAddress>("address/createAddressAsync", async (createAddress, thunkAPI) => {
    try {
        const result = await agent.Address.Create(createAddress);
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const deleteAddressAsync = createAsyncThunk<any, any>("address/deleteAddressAsync",
    async (id, thunkAPI) => {
        try {
            return await agent.Address.delete(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    });

// export const updateAddressAsync = createAsyncThunk<any, UpdateAddress>("address/updateAddressesAsync",
//     async (updateAddress, thunkAPI) => {
//         const data = convertToUpdateAddress(updateAddress);
//         try {
//             return await agent.Address.update(data);
//         } catch (error: any) {
//             return thunkAPI.rejectWithValue({ error: error.data })
//         }
//     });

const addressAdapter = createEntityAdapter<Address>(); // สรา้งตัวแปรแบบ Adapter

export const addressSilce = createSlice({
    name: "AccountAddress",
    initialState : addressAdapter.getInitialState(initialState), 
    reducers:{
        setAddress: (state, action) => {
            state.address = action.payload
        }
    }, 
    extraReducers: (builder => {
        builder.addCase(GetAddressAll.fulfilled, (state, action) => {
            addressAdapter.setAll(state, action.payload)
            state.address = action.payload;
            state.addressloaded = true
          });
    })

    
});

export const {setAddress } = addressSilce.actions

export const addressSelectors = addressAdapter.getSelectors((state: RootState) => state.address);