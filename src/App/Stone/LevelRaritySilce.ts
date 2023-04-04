import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CommunityGroup } from "../Model/CommunityGroup";
import { LevelRarity } from "../Model/LevelRarity";
import { setCart } from "./cartSlice";

interface LevelRaritysState{
    LevelRaritys: LevelRarity[] | null,
}

const initialState : LevelRaritysState= {
    LevelRaritys: null

}


export const GetLevelRaritys = createAsyncThunk(
    'product/levelraritys',
    async (_, thunkAPI) => {
        try {
            const data = await agent.ListLevelRarity.GetLevelRarity();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);



export const LevelRaritySilce = createSlice({
    name: "LevelRarity",
    initialState ,
    reducers:{
        setLevelRarity: (state, action) => {
            state.LevelRaritys = action.payload;
          },
    },
    extraReducers: (builder => {
        builder.addCase(GetLevelRaritys.fulfilled, (state, action) => {
            if (action.payload) {
                state.LevelRaritys = action.payload
              }
        });
    })

    
});

export const { setLevelRarity} = LevelRaritySilce.actions




