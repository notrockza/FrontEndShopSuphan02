export interface Address {
    status: any;
    accountID: any;
    id:                 string;
    addressInformation: AddressInformation;
    account:            Account;
    statusAddress:      StatusAddress;
    statusAddressID:    number;
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

export interface AddressInformation {

    recipientName: any;
    id:                 string;
    detail:             string;
    accountName:        string;
    accountPhoneNumber: string;
    province:           string;
    district:           string;
    subDistrict:        string;
    zipCode:            string;
}

export interface StatusAddress {
    id:   number;
    name: string;
}

export interface CreateAddress {
    subDistrict: string ,
    district: string,
    province: string,
    zipCode: string,
    accountName: string,
    accountPhoneNumber: string,
    detail: string,
    accountID: number
}

export interface UpdateAddress {
    id:                 string;
    detail:             string;
    accountName:        string;
    accountPhoneNumber: string;
    province:           string;
    district:           string;
    subDistrict:        string;
    zipCode:            string;
}
