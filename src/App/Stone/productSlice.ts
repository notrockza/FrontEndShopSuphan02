import { createAsyncThunk, createEntityAdapter, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Result } from "../Model/Interfaces/IResponse";
import { CategoryName, ImageProduct, Product, ProductParams } from "../Model/Product";
import { RootState } from "./configureStore";

interface ProductState{
    products: Product[] | null;
    productsLoaded : boolean;
    detailProduct : Product | null;
    productsdetailLoaded : boolean;
    productParams: ProductParams;
    // CategoryNames : CategoryName[] | null
    // CategoryNameloaded : boolean;
}



export const GetProduct = createAsyncThunk<Product[]>(
    'product/GetProduct',
    async (_, thunkAPI) => {
        try {
            const {data} = await agent.Product.getproducts();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const GetProductDetail = createAsyncThunk<any, number>(
    'product/GetProductDetail',
    async (id, thunkAPI) => {
        try {
            return await agent.Product.details(id);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)

export const DeletProduct = createAsyncThunk<any, number>(
    "product/deletProduct", 
    async (id, thunkAPI) => {
    try {
        const results = await agent.Product.delete(id);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const createProductAsync = createAsyncThunk<any, any>("product/createProductAsync", async (product, thunkAPI) => {
    try {
        const result = await agent.Product.create(product);
        return result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const crateImageProductAsync = createAsyncThunk<Result, any>("product/crateImageProductAsync", async (value, thunkAPI) => {
    try {
        return await agent.ImageProduct.create(value);
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

export const editProductAsync = createAsyncThunk<any, any>("product/editProductAsync", async (product, thunkAPI) => {
    try {
        const results = await agent.Product.update(product);
        return results;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data })
    }
});

const initParams = (): ProductParams => {
    return {
        pageNumber: 1,
        pageSize: 9,
        category: "",
        rangePriceStart: 0,
        rangePriceEnd: 0,
        searchTerm: "" ,
        accountID : ""
    }
};

const productsAdapter = createEntityAdapter<Product>();

// const initialState : ProductState= {
//     products: null,
//     productsLoaded: false,
//     detailProduct: null,
//     productsdetailLoaded: false,
//     productParams: initParams(),
//     imageProducts: null,
//     imageProductLoaded: false,
// }


export const productSlice = createSlice({
    name: "product" ,
    initialState: productsAdapter.getInitialState<ProductState>({
        products: null,
    productsLoaded: false,
    detailProduct: null,
    productsdetailLoaded: false,
    productParams: initParams(),

    // CategoryNames: null,
    // CategoryNameloaded : false,
    }),
    reducers:{
        resetDetailProduct:(state)=>{
            state.productsdetailLoaded = false;
          },
          setParams: (state, action) => {
            state.productsLoaded = false; // เพื่อ Product มัน reload ใหม่
            state.productParams = { ...state.productParams, ...action.payload };
        },
          resetProductParams: (state) => {
            state.productsLoaded = false;
            state.productParams = initParams();
        },
    },
    extraReducers: (builder => {
        builder.addCase(GetProduct.fulfilled, (state, action) => {
            state.products = action.payload
            state.productsLoaded = true
        });
        builder.addCase(GetProductDetail.fulfilled, (state, action) => {
            if(action.payload.msg === 'OK')
            state.detailProduct = action.payload.data;
            state.productsdetailLoaded = true
          });
        builder.addMatcher(isAnyOf(editProductAsync.fulfilled), (state, action) => {
            const { isSuccess } = action.payload;
            if (isSuccess === true) state.productsLoaded = false;
        });
    })
    
});

export const {resetDetailProduct , resetProductParams } = productSlice.actions

// export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product); 



