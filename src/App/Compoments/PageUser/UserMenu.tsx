import { Avatar, Dropdown, Space } from "antd";
import Swal from "sweetalert2";
import { Badge } from "antd";

import { Register } from "../../Model/Account";
import { fetchAccount, logout } from "../../Stone/accountSlice";
import { useAppDispatch, useAppSelector } from "../../Stone/configureStore";
import {
  LoginOutlined,
  DownOutlined,
  SmileOutlined,
  HeartOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Fragment, useEffect } from "react";
import "../ProfileUser/ProfileUserCss.css";
import { fetchCartAsync, removeCartItemAsync } from "../../Stone/cartSlice";
import { LogoutOutlined } from "@ant-design/icons";
import { BiLogIn, } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { GrUserAdmin } from "react-icons/Gr";
import { AiOutlineShoppingCart } from "react-icons/Ai";

import useCart from "../hooks/useCart";
import React from "react";
import { Ts } from "../../API/util/util";
import useUser from "../hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const UserMenu = () => {
  const { itemCount, carts, priceTotal } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //const { account } = useAppSelector((state) => state.account);
  //const account = JSON.parse(localStorage.getItem("account")!)
  const {account ,localaccount} = useUser();

  const submitlogout = () => {
    Swal.fire({
      title: "ออกจากระบบหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3c16e8",
      cancelButtonColor: "#d33",
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
    }).then((result) => {
      if (result.isConfirmed && dispatch(logout())) {
        Swal.fire("เรียบร้อย", "ออกสู่ระบบสำเร็จ", "success");
      }
    });
  };


  const onDelete = (id: any) => {
    dispatch(removeCartItemAsync(id)).then(() =>
      dispatch(fetchCartAsync(localaccount?.id))
    );
  };

  // if(account.roleName === 'Admin')
  // return 

  const isRole = ()=>{
    if(localaccount?.roleName === "Admin"){
      return true
    }
    else{
      return false
    }
  }

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link to="/profile">
          <VscAccount /> บัญชี
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/profile" rel="noopener noreferrer" onClick={() => {
          navigate("/profile", { state: "3" });
        }}> 
          รายการสั่งซื้อ
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        
        <Link rel="noopener noreferrer" to="/admin/dashboard">
           เเอดมิน
        </Link>
        
      ),

        disabled: isRole() ? false : true,

    },
    {
      key: "4",
      danger: true,
      label: (
        <Link
          rel="noopener noreferrer"
          onClick={() => {
            submitlogout();

          } } to=""        >
          <BiLogIn /> ออกจากระบบ
        </Link>
      ),
    },
  ];



  return (
    <Fragment>
      <div className="navbar-wrap main-menu d-none d-lg-flex">
        <ul className="navigation">
          <li className="active dropdown">
            <Link to="/">หน้าเเรก</Link>
            {/* <ul className="submenu">
              <li className="active">
                <a href="/">หน้า หนึ่ง</a>
              </li>
              <li>
                <a href="/">หน้าที่ สอง</a>
              </li>
              <li>
                <a href="/">หน้าที่ สาม</a>
              </li>
            </ul> */}
          </li>
          {/* <li>
            <a href="/">เกี่ยวกับเรา</a>
          </li> */}

          <li>
            <Link to="/product">สินค้า</Link>
          </li>
          {/* <li>
            <a href="/">ติดต่อ</a>
          </li> */}
          {account !== null ? (
            <></>
          ) : (
            <li>
              <Link to="/login">เข้าสู้ระบบ</Link>
            </li>
          )}
        </ul>
      </div>

      {account !== null ? (
        <li>
          <div className="header-action d-none d-md-block">
            <ul>
              
              <li className="header-shop-cart">
                <Link to="/cart">
                  <i className="fas fa-shopping-basket"></i>
                  
                  {/* <ShoppingCartOutlined /> */}
                
                  {itemCount === 0 ? (
                    <div></div>
                  ) : (
                    <>
                      <span>
                        <Ts>{itemCount}</Ts>
                      </span>
                    </>
                  )}
                </Link>
                <ul className="minicart">
                  {carts?.map((cart) => {
                    return (
                      <li className="d-flex align-items-start" key={cart.id}>
                        <div className="cart-img">
                          <Ts href="#">
                            <img src={cart.imageProduct} alt="" />
                          </Ts>
                        </div>
                        <div className="cart-content">
                          <h4>
                            <Ts>{cart.product.name}</Ts>
                          </h4>
                          <div className="cart-price">
                            <span className="new">฿{cart.product.price}</span>
                            <span>
                              <a>x{cart.amountProduct}</a>
                            </span>
                          </div>
                        </div>
                        <div className="del-icon">
                          <Ts>
                            <i
                              className="far fa-trash-alt"
                              onClick={() => {
                                onDelete(cart.id);
                              }}
                            ></i>
                          </Ts>
                        </div>
                      </li>
                    );
                  })}

                  {itemCount !== 0 ? (
                    <Ts>
                    </Ts>
                  ) : (
                    <img
                      className="container"
                      src="https://drive.google.com/uc?id=1oo9GMk7ekDQ3aeoIBFk_9H1iRZ1v34ji"
                      alt=""
                      style={{ width: "70%" }}
                    />
                  )}

                  <li>
                    <div className="total-price">
                      <span className="f-left">ราคารวม:</span>

                      <span className="f-right">฿{priceTotal} บาท</span>
                    </div>
                  </li>
                  <li>
                    <div className="checkout-link">
                      <Link to="/cart">ตะกร้าสินค้า</Link>
                      <Ts className="red-color" href="#">
                        สั่งซื้อสินค้า
                      </Ts>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      ) : (
        <></>
      )}

      {localaccount !== null ? (
        <div className="navbar">
          <Dropdown menu={{ items }}>
            <a onClick={(e) => e.preventDefault()}>
              <Avatar
                src={localaccount ? localaccount.image : null}
                style={{ width: "45px", height: "45px" }}
                className="avatar"
              />{" "}
              <Space>
                {localaccount.name}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      ) : (
        <Ts></Ts>
      )}
    </Fragment>
  );
};
