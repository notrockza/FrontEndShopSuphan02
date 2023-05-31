import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Community, ProductStatistics, SalesStatistics } from "../Model/Report";
import { date } from "yup";


interface ReportState{
    productStatistics: ProductStatistics[] | null;
    productStatisticsLoaded: boolean;
    salesStatistics: SalesStatistics | null;
    salesStatisticsLoaded: boolean;
    salesCommunity: Community | null;
    salesCommunityLoaded: boolean;
}

const initialState : ReportState= {
    productStatistics: null,
    productStatisticsLoaded: false,
    salesStatistics: null,
    salesStatisticsLoaded: false,
    salesCommunity: null,
    salesCommunityLoaded: false
}


export const fetchProductStatisticsAsync = createAsyncThunk<any>(
    'report/fetchProductStatisticsAsync',
    async (value, thunkAPI) => {
        try {
            const result = await agent.Report.getProductStatistics();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchSalesStatisticsAsync = createAsyncThunk<any>(
    'report/fetchSalesStatisticsAsync',
    async (value, thunkAPI) => {
        try {
            const result = await agent.Report.getSalesStatistics();
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
);

export const fetchSalesCommunityAsync = createAsyncThunk<any>(
    'report/fetchSalesCommunityAsync',
    async (date, thunkAPI) => {
        try {
            const result = await agent.Report.getReport(date);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)


export const reportSlice = createSlice({
    name: "Reviwe",
    initialState ,
    reducers:{
        reSetProductStatistics: (state) => {
            state.productStatisticsLoaded = false;
            state.productStatistics = null;
        } ,
        reSetSalesStatistics: (state) => {
            state.salesStatisticsLoaded = false;
            state.salesStatistics = null;
        },
        reSetSalesCommunity: (state) => {
            state.salesCommunityLoaded = false;
            state.salesCommunity = null;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchProductStatisticsAsync.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.productStatistics = action.payload.data;
            state.productStatisticsLoaded = true
          });
          builder.addCase(fetchSalesStatisticsAsync.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.salesStatistics = action.payload.data;
            state.salesStatisticsLoaded = true
          });

          builder.addCase(fetchSalesCommunityAsync.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.salesCommunity = action.payload.data;
            state.salesCommunityLoaded = true
          });
    })


    
});

export const {reSetProductStatistics ,reSetSalesStatistics,reSetSalesCommunity} = reportSlice.actions




