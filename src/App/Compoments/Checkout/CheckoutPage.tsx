import {
  Space,
  Image,
  Button,
  Card,
  List,
  Row,
  Col,
  InputNumber,
  Tag,
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { title } from "process";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import agent from "../../API/Agent";
import { currencyFormat, Ts } from "../../API/util/util";
import MainContainer from "../../layout/MainContainer";
import TopSection from "../../layout/TopSection";
import { Cart } from "../../Model/Cart";
import { Result } from "../../Model/Interfaces/IResponse";
import { ItemRequest, OrderRequest } from "../../Model/Order";
import {
  fetchCartAsync,
  removeCartItemAsync,
  updateCartAsync,
} from "../../Stone/cartSlice";
import { useAppDispatch } from "../../Stone/configureStore";
import useAddress from "../hooks/useAddress";
import useCart from "../hooks/useCart";
import FooterUser from "../PageUser/FooterUser";
import HeaderUser from "../PageUser/HeaderUser";
import { ColAccount } from "../ProfileUser/ProfileUser";
import CheckoutAddress from "./CheckoutAddress";
import { DeleteOutlined } from "@ant-design/icons";
import CheckoutInfoPayment from "./CheckoutInfoPayment";
import AccountPurchase from "../ProfileUser/AccountOrder";
import { fetchOrderByIdAccountAsync } from "../../Stone/orderSlice";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: <Ts>สินค้า</Ts>,
    dataIndex: "product",
    key: "product",
    render: (data: Cart) => (
      <Space size="middle" className="text-st">
        <Image src={data.imageUrl} width={50} />
        <Link to={""}>{data.name}</Link>
      </Space>
    ),
    width: "50%",
  },
  {
    title: <Ts>ราคาต่อชิ้น</Ts>,
    dataIndex: "price",
    key: "price",
    render: (data) => <Ts>{currencyFormat(data)}</Ts>,
  },
  {
    title: <Ts>จำนวน</Ts>,
    key: "amount",
    dataIndex: "amount",
    render: (data) => <Ts>{data}</Ts>,
  },
  {
    title: <Ts>ราคารวม</Ts>,
    key: "total",
    dataIndex: "total",
    render: (data) => <Ts>{currencyFormat(data)}</Ts>,
  },
];

function CheckoutPage() {
  const dispatch = useAppDispatch();
  const { addresses } = useAddress();
  const address = addresses.find((x) => x.statusAddressID === 1);
  const navigate = useNavigate();
  const { carts, priceTotal } = useCart();
  const accountid = JSON.parse(localStorage.getItem("account")!);

  async function onChangeNumberCart({ value, data }: any) {
    var result: any = dispatch(
      updateCartAsync({
        data: data,
        amountProduct: value,
        idAccount: accountid?.id,
      })
    );
    if (result.msg === "OK") {
      dispatch(fetchCartAsync(accountid?.id));
    }
    dispatch(fetchCartAsync(accountid?.id));
  }

  const onDelete = (id: any) => {
    dispatch(removeCartItemAsync(id)).then(() =>
      dispatch(fetchCartAsync(accountid?.id))
    );
  };




  const data = carts?.map((cart) => {
    return (
      <ColAccount>
        <Card hoverable className="text-st mt-2 " key={cart.id}>
          <Space size="large" direction="vertical" style={{ width: "100%" }}>
            <div className="">
              <div className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                  <div
                    className="bg-image hover-overlay hover-zoom ripple rounded"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      src={cart.imageProduct}
                      className="w-100"
                      alt="Blue Jeans Jacket"
                    />
                    <a href="#!">
                      <div
                        className="mask"
                        style={{ background: "rgba(251, 251, 251, 0.2)" }}
                      ></div>
                    </a>
                  </div>
                </div>

                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                  <p>
                    <strong>{cart.product.name} </strong>
                  </p>
                  <p>
                    ประเภท{" "}
                    <Tag color="geekblue">
                      {cart.product.categoryProduct.name}
                    </Tag>
                  </p>
                  <p>จำนวนx{cart.product.stock}: </p>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                  <div
                    className="text-start text-md-center"
                    style={{ maxWidth: "300px" }}
                  >
                    <InputNumber
                      style={{}}
                      min={1}
                      max={cart.product.stock}
                      value={cart.amountProduct}
                      onChange={(value) => {
                        onChangeNumberCart({ value, data: cart });
                      }}
                    />

                    <DeleteOutlined
                      style={{ width: "10px", color: "red", height: "100%" , margin:"10px" , padding:"5px"  }}
                      onClick={() => {
                        onDelete(cart.id);
                      }}
                    />
                  </div>

                  <p className="text-start text-md-center mr-4">
                    <strong>฿{cart.product.price} บาท</strong>
                  </p>
                </div>
              </div>
            </div>
          </Space>
        </Card>
      </ColAccount>
    );
  });

  const orderreuest: OrderRequest = {
    addrrssID: address ? address.id : "",
    items: carts
      ? carts.map(
          (cart) =>
            ({
              cartID: cart.id,
              productAmount: cart.amountProduct,
              productID: cart.product.id,
              productPrice: cart.product.price,
            } as ItemRequest)
        )
      : [],
  };

  const onClickOrder = async () => {
    const result = await agent.Order.create(orderreuest);
    if (carts?.length! > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "บันทึกสำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      }).then(() => dispatch(fetchCartAsync(accountid.id))) .then(() => navigate("/profile", { state: "3" })).then(()=> dispatch(fetchOrderByIdAccountAsync(accountid.id)));
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "บันทึกไม่สำเร็จ",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    console.log(result);
  };



  return (
    <Fragment>
      <HeaderUser />

      <MainContainer className="col2-right-layout pt-190">
        <div className="row">
          <section className="col-main col-sm-8">
            <div className="one-page-checkout" id="checkoutSteps">
              <div className="site-card-border-less-wrapper">
                <div className="block-title">
                  {" "}
                  สินค้าที่สั่งซื้อ {carts?.length}
                </div>
                <br />
                {/* <span>{carts ? <>{test}</> : <>555</>}</span> */}

                {carts?.length === 0 ? (
                  <List>
                    <Card hoverable className="text-st mt-2 ">
                      <Space
                        size="large"
                        direction="vertical"
                        style={{ width: "88%" }}
                      >
                        <img
                          src="https://drive.google.com/uc?id=1xWH1uQI9e_h4jn3Mn8Q84ucmPd3KDC6s"
                          className="w-100"
                          alt="Blue Jeans Jacket"
                          width="100%"
                        />
                      </Space>
                    </Card>
                  </List>
                ) : (
                  <>{data}</>
                )}
              </div>
            </div>
          </section>
          <div
            className="col-right sidebar col-sm-4 wow bounceInUp animated animated"
            style={{ marginBottom: "30px" }}
          >
            <div id="checkout-progress-wrapper">
              <Card
                title="ที่อยู่ในการจัดส่ง"
                className="block block-progress text-st"
                extra={
                  <Button
                    type="link"
                    className="text-st"
                    onClick={() => navigate("/profile", { state: "2" })}
                  >
                    {address ? "เปลี่ยน" : "เพิ่ม"}
                  </Button>
                }
              >
                <CheckoutAddress address={address} />
              </Card>

              <Card
                title="การชำระเงิน"
                className="block block-progress text-st"
                actions={[
                  <Button
                    onClick={onClickOrder}
                    style={{ width: "90%" }}
                    htmlType="button"
                    size="large"
                    className="button btn-proceed-checkout"
                  >
                    {/* <span>{!carts ? "ดำเนินการชำระเงิน" : "ดำเนินการสั่งจอง"}</span> */}
                    <span>{"ดำเนินการชำระเงิน"}</span>
                  </Button>,
                ]}
              >
                <CheckoutInfoPayment />
              </Card>
            </div>
          </div>
        </div>
      </MainContainer>
      <FooterUser />
    </Fragment>
  );
}

export default CheckoutPage;
