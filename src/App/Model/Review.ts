export interface Review {
    [x: string]: any;
    id:            string;
    created:       Date;
    text:          string;
    accountID:     number;
    productID:     number;
    account:       Account;
}



export interface Account {
    id:       number;
    name:     string;
    email:    string;
    password: string;
    tell:     string;
    image:    string;
    roleID:   number;
    role:     null;
}

export interface ReviewRequest {
    text:          string;
    accountID?:    number;
    productID?:    number;
    formFiles?:    string;
};