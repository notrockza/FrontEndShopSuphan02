// get
export interface Order {
  id:             string;
  paymentStatus:  Paymentstatus;
  proofOfPayment: string;
  created:        any;
  priceTotal:     number;
  accountStatus:  boolean;
  addressID:      string;
  address:        Address;
  orderItems:     OrderItem[];
}

export interface OrderItem {
  id:             string;
  orderAccountID: string;
  productID:      number;
  productPrice:   number;
  productAmount:  number;
  product:        Product;
}

export interface Product {
  id:                number;
  name:              string;
  price:             number;
  stock:             number;
  detail:            string;
  image:             string;
  categoryProductID: number;
  categoryProduct:   null;
  communityGroupID:  number;
  communityGroup:    null;
  levelRarityID:     number;
  levelRarity:       null;
}

export interface Address {
  id:                   string;
  accountID:            number;
  statusAddressID:      number;
  addressInformationID: any;
  addressInformation:   any;
  account:              any;
  statusAddress:        any;
}
// get

// post
export interface OrderRequest {
  addrrssID: string;
  items: ItemRequest[];
}

export interface ItemRequest {
  cartID: string;
  productID: number;
  productPrice: number;
  productAmount: number;
}
//post

//put
export interface Paymemt {
  id:             string;
  paymentStatus:  Paymentstatus;
  proofOfPayment: string;
  created:        Date;
  priceTotal:     number;
  deliveryFee:    number;
  accountStatus:  boolean;
  addressID:      string;
  address:        null;
}

//put
export enum Paymentstatus
{
    WaitingForPayment, // กำลังรอการชำระเงิน
    PendingApproval, // รอการอนุมัติ
    SuccessfulPayment // ชำระเงินสำเร็จ
}


export interface OrderConfirmOrder {
  id:             string;
  paymentStatus:  Paymentstatus;
  proofOfPayment: string;
  created:        Date;
  priceTotal:     number;
  deliveryFee:    number;
  accountStatus:  boolean;
  addressID:      string;
  address:        Addresss;
}

export interface Addresss {
  id:                   string;
  accountID:            number;
  statusAddressID:      number;
  addressInformationID: string;
  addressInformation:   null;
  account:              null;
  statusAddress:        null;
}

