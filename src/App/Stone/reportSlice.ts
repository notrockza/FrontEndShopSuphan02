import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { ProductStatistics, SalesStatistics } from "../Model/SalesStatistics";


interface ReportState{
    productStatistics: ProductStatistics[] | null;
    productStatisticsLoaded: boolean;
    salesStatistics: SalesStatistics | null;
    salesStatisticsLoaded: boolean;
}

const initialState : ReportState= {
    productStatistics: null,
    productStatisticsLoaded: false,
    salesStatistics: null,
    salesStatisticsLoaded: false
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
    })


    
});

export const {reSetProductStatistics ,reSetSalesStatistics} = reportSlice.actions




