import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { CommunityGroup } from "../Model/CommunityGroup";
import { setCart } from "./cartSlice";

interface CommunityGroupState{
    CommunityGroups: CommunityGroup[] | null,
}

const initialState : CommunityGroupState= {
    CommunityGroups: null

}


export const GetCommunityGroup = createAsyncThunk(
    'product/communitygroup',
    async (_, thunkAPI) => {
        try {
            const data = await agent.ListCommunityGroup.GetCommunityGroup();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);



export const CommunityGroupSilce = createSlice({
    name: "CommunityGroup",
    initialState ,
    reducers:{
        setCommunityGroup: (state, action) => {
            state.CommunityGroups = action.payload;
          },
    },
    extraReducers: (builder => {
        builder.addCase(GetCommunityGroup.fulfilled, (state, action) => {
            if (action.payload) {
                state.CommunityGroups = action.payload
              }
        });
    })

    
});

export const { setCommunityGroup} = CommunityGroupSilce.actions




