import axios, { AxiosError, AxiosResponse } from "axios";
// axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL;
//axios.defaults.baseURL = "http://10.103.0.16/cs63/s03/project-end/";
axios.defaults.baseURL = "https://localhost:7048/";

// axios.defaults.withCredentials = true;

const sleep = () => new Promise(resolve => setTimeout(resolve, 100));

const responseBody = (response: AxiosResponse) => response.data; //ให้ส่งข้อมูลออกไป

axios.interceptors.response.use(async response => {
    // if (import.meta.env.NODE_ENV === 'development') 
    await sleep();

    return response
}, (error: AxiosError) => {
    return Promise.reject(error.response) //ส่งไปให้ catch(error) นำไปใช้ได้เลย
});

const createFormData = (item: any) => {
    let formData = new FormData();
    for (const key in item) formData.append(key, item[key]);
    return formData;
};

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
    login: (value: any) => requests.post('Account/Login', value),
    register: (value: any) => requests.post('Account/Register', value),
    GetAccountID: (id: any) => requests.get(`Account/GetAccountByID/${id}`),
    GetAccountAll: () => requests.get('Account/GetAccountAll'),
    delete: (id: number) => requests.delete(`Account/DeleteUser?id=${id}`),
    update: (value: any) => requests.put("Account/UpdateAccount", createFormData(value)),

};

const ListRole = {
    roles: () => requests.get('Role/GetRoleAll' ),
   
};

const Product = {
    getproducts: () => requests.get('Product/GetProduct' ),
    details: (id: number) => requests.get(`Product/${id}`),
    delete: (id: number) => requests.delete(`Product/DeleteProduct?id=${id}`),
    create: (value: any) => requests.post('Product/AddProduct', createFormData (value)),
    update: (value: any) => requests.put("Product/UpdateProduct", createFormData (value)),
};

const ImageProduct = {
    get: (id: any) => requests.get(`ProductDescription/GetDetailAll/${id}`),
    delete: (ID: any) => requests.delete(`ProductDescription/DeleteimageDetail?ID=${ID}`),
    create: (values: any) => {
        let formData = new FormData();
        for (const key in values) formData.append(key, values[key]);
        for (let i = 0; i < values.formFiles.length; i++) formData.append("formFiles", values.formFiles[i]);
        return requests.post("ProductDescription/AddProductDescription", formData)
    },
    // update: (value: any) => requests.put("detailProduct", value),
    // delete: (idProduct: any) => requests.delete(`detailProduct/${idProduct}`)
}

const Cart = {
    GetByidCrat: (idAccount: any) => requests.get(`Cart/GetCartCustomerAll?idAccount=${idAccount}`),
    AddCrat: (value: any) => requests.post("Cart/AddCartCustomer",value),
    DeleteCrat: (id: any) => requests.delete(`Cart/DeleteCartCustomer?id=${id}`),
    UpdateCrat: (value: any) => requests.put("Cart/UpdateCartCustomer",value),
}

const Order = {
    getByIdAccount: (idAccount: any) => requests.get(`OrderAccount/GetAll/${idAccount}`),
    create: (value: any) => requests.post(`OrderAccount/AddOrderCustomer`, value),
    detail: (idOrder: any) => requests.get(`OrderAccount/GetAllProductList/${idOrder}`),
    update: (value: any) => requests.put("OrderAccount/PaymentOrder/",createFormData(value) ),
    getConfirm: () => requests.get('OrderAccount/GetConfirmOrder' ),
    GetConfirmOrderAccount: (idAccount: any) => requests.get(`OrderAccount/GetConfirmOrderAccount/${idAccount}` ),
    updateConfirmOrder: (value: any) => requests.put("OrderAccount/ConfirmOrder",createFormData(value) ),
    
    
}

const ListCategory = {
    GetCategory: () => requests.get('CategoryProduct/GetAll'),
   
};

const ListCommunityGroup = {
    GetCommunityGroup: () => requests.get('CommunityGroup/GetAll' ),
   
};

const ListLevelRarity = {
    GetLevelRarity: () => requests.get('LevelRarity/GetAll' ),
   
};

const Review = {
    Get: (idProduct:any )=> requests.get(`Review/GetReviewAll?idProduct=${idProduct}`),
    Create: (value: any) => requests.post('Review/AddReview', createFormData (value)),
   
};

const Address = {
    Get: (idAccount:any )=> requests.get(`GetAddressAll/${idAccount}`),
    Create: (value: any) => requests.post('/CreateAddress', createFormData (value)),
    update: (value: any) => requests.put("address", value),
    updateStatus: (value: any) => requests.put("EditAddressStatus/", value),
    delete: (id: any) => requests.delete(`/DeleteAddress?ID=${id}`),
}

const Report = {
    getProductStatistics: () => requests.get("Report/GetProductStatistics"),
    getSalesStatistics: () => requests.get("Report/GetSalesStatistics"),
}
const Information = {
    getInformatonAll: () => requests.get('Information/GetInformation'),
    details: (id: number) => requests.get(`Information/${id}`),
    create: (value: any) => requests.post('Information/AddInformation', createFormData (value)),
    update: (value: any) => requests.put("Information/UpdateInformation", createFormData (value)),
    delete: (id: number) => requests.delete(`Information/DeleteInformation?id=${id}`),
};



const agent = {
    Account,
    ListRole,
    Product,
    Cart,
    ListCategory,
    ListCommunityGroup,
    ListLevelRarity,
    ImageProduct,
    Review,
    Order,
    Address,
    Report,
    Information
};

export default agent;
