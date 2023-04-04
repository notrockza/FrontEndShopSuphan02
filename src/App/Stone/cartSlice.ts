import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Cart } from "../Model/Cart";

interface AccountState{
    carts: Cart[] | null,
    status : string;


}

const initialState : AccountState= {
    carts: null,
    status:'',

}

export const fetchCartAsync = createAsyncThunk<any, any>(
    "cart/fetchCartAsync",
    async (accountId, thunkAPI) => {
      try {
        const result = await agent.Cart.GetByidCrat(accountId);
        return result;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );
  
export const addCartItemAsync = createAsyncThunk<Cart ,{ productId: string; accountId: string; amount: number }>(
    "cart/addCartItemAsync",
  async ({ productId, accountId, amount }, thunkAPI) => {
      try {
        let formData = new FormData();
        formData.append("AccountID", accountId);
        formData.append("ProductID", productId);
        formData.append("AmountProduct", amount.toString());
        const { result } = await agent.Cart.AddCrat(formData);
        return result;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  export const updateCartAsync = createAsyncThunk<Cart, any>(
    "cart/updateCartAsync",
    async ({ data, amountProduct, idAccount }, thunkAPI) => {
      try {
        // console.log(data)
        let formData = new FormData();
        formData.append("ID", data.id);
        formData.append("AccountID", idAccount);
        formData.append("ProductID", data.product.id);
        formData.append("AmountProduct", amountProduct);
        const { result } = await agent.Cart.UpdateCrat(formData);
        return result;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    }
  );

  export const removeCartItemAsync = createAsyncThunk<Cart, number>("cart/removeCartItemAsync",
    async (id, thunkAPI) => {
        try {
            const result = await agent.Cart.DeleteCrat(id);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    });


export const cratSlice = createSlice({
    name: "account" ,
    initialState ,
    reducers:{
        setCart: (state, action) => {
            state.carts = action.payload;
          },
          clearCart: (state) => {
            state.carts = null;
          },          
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
          state.carts = action.payload;
          state.status = "idle";
        });
      },

    
});

export const {setCart,clearCart} = cratSlice.actions