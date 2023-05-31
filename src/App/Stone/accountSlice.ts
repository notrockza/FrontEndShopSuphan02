import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import agent from "../API/Agent";
import { Login, Register } from "../Model/Account";
import {Role} from "../Model/Account"
import { setCart } from "./cartSlice";

interface AccountState{
    account: Register | null,
    accounts: Register[] | null,
    roles: Role[] | null,
    token: string| null,
    userLoaded : boolean;

}

const initialState : AccountState= {
    roles: null,
    account: null,
    accounts: null,
    token: null,
    userLoaded: false
}

export interface setUpAccount {
  account: Register;
  token: string;
}

export const loadAccountStorage = () =>
  JSON.parse(localStorage.getItem("account")!);


export const loginAccount = createAsyncThunk<any, Login>(
    'account/login',
    async (data, thunkAPI) => {
        try {
            let formData = new FormData();
            formData.append("Email", data.email);
            formData.append("Password", data.password);
            const result = await agent.Account.login(formData);
            console.log(result)
            if (result.msg === "OK") {
              const token = result.token;
              const account = result.data;
              const cart = result.cart;
              thunkAPI.dispatch(setCart(cart));
              thunkAPI.dispatch(setTingAccount({ account: account, token: token } as setUpAccount));
              localStorage.setItem("account", JSON.stringify(account))
          }
            
            return result;
            // console.log(result);
            // return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const fetchAccount = createAsyncThunk<Register>(
    "account/fetchAccount",
    async (_, thunkAPI) => {
      const account = loadAccountStorage();
      thunkAPI.dispatch(setAccount(account));
      try {
        const data = await agent.Account.GetAccountID(account.id);
        localStorage.setItem(
          "account",
          JSON.stringify({ ...account, account: data })
        );
        return data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue({ error: error.data });
      }
    },
    {
      condition: () => {
        if (!localStorage.getItem("account")) return false;
      },
    }
  );

export const registerAccount = createAsyncThunk<any, any>(
    'account/register',
    async (data, thunkAPI) => {
        try {
            let formData = new FormData();
            formData.append("Name", data.name);
            formData.append("Email", data.email);
            formData.append("Password", data.password);
            formData.append("Tell", data.tell.toString());
            formData.append("FormFiles", data.formflie);
            formData.append("RoleID", "1");
            // formData.append("RoleID", data.roleID.toString());
            const result = await agent.Account.register(formData);
            console.log(result);
            return result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);


export const roleAccount = createAsyncThunk(
    'account/roleAccount',
    async (_, thunkAPI) => {
        try {
            const {data} = await agent.ListRole.roles();
            console.log(data);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data });
        }
    }
);

export const GetAccountAll = createAsyncThunk<Register[]>(
  'account/GetAccount',
  async (_, thunkAPI) => {
      try {
          const data = await agent.Account.GetAccountAll();
          console.log(data);
          return data;
      } catch (error: any) {
          return thunkAPI.rejectWithValue({ error: error.data });
      }
  }
);


export const DeleteUser = createAsyncThunk<any, number>(
  "product/DeleteUser", 
  async (id, thunkAPI) => {
  try {
      const results = await agent.Account.delete(id);
      return results;
  } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data })
  }
});


export const accountSlice = createSlice({
    name: "account" ,
    initialState ,
    reducers:{
        setRote: (state, action) => {
          state.roles = action.payload;
        },
        setAccount: (state, action) => {
            state.account = action.payload;
            // if (action.payload.token) state.token = action.payload.token;
          },
          setTingAccount: (state, action) => {
            const { account, token } = action.payload;
            localStorage.setItem(
              "account",
              JSON.stringify({
                account: account,
                token: token,
              })
            );
          },
          logout: (state) => {
            state.token = null;
            state.account = null;
            localStorage.removeItem("account");
        }
    },
    extraReducers: (builder => {
      builder.addCase(GetAccountAll.fulfilled, (state, action) => {
        state.accounts = action.payload
        state.userLoaded = true

    });
        builder.addCase(roleAccount.fulfilled, (state, action) => {
            if (action.payload.result) {
                state.account = action.payload.result.account;
                state.token = action.payload.result.token;
                state.roles = action.payload
              }
        });
       
        
    })
    
});

export const {setTingAccount , setAccount , logout,setRote} = accountSlice.actions




