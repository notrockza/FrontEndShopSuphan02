import React, { useEffect, useState } from 'react'
import HeaderUser from '../PageUser/HeaderUser'
import './Cartscss.css'
import { InputNumber } from 'antd';
import FooterUser from '../PageUser/FooterUser';
import { useAppDispatch, useAppSelector } from '../../Stone/configureStore';
import { fetchCartAsync, updateCartAsync } from '../../Stone/cartSlice';
import { ColAccount } from '../ProfileUser/ProfileUser';
import useCart from '../hooks/useCart';
import { toast } from 'react-toastify';
import { Ts } from '../../API/util/util';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//import Lottie from "lottie-react";

export interface DataTypeCart {
  key: string;
  accountId: string;
  stock: number;
  cartItemId: number;
  product: object;
  amount: number;
  price: number;
  total: number;
  action: any;
}

function Carts() {

  const {carts , priceTotal} = useCart();
  const accountid = JSON.parse(localStorage.getItem("account")!)
	const dispatch = useAppDispatch();
  const [dataCart, setDataCart] = useState<DataTypeCart[]>([]);
  const navigate = useNavigate();
  
  async function onChangeNumberCart({ value, data }: any) {
    var result: any = dispatch(
      updateCartAsync({
        data: data,
        amountProduct: value,
        idAccount: accountid?.id,
      })
    );
    if(result.msg === "OK"){
      dispatch(fetchCartAsync(accountid?.id));
    }
    dispatch(fetchCartAsync(accountid?.id));}

    const AddCheckout = () => {
      if (carts?.length !> 0) {
        navigate("/checkout");
      }
      else {
        Swal.fire({
          title: 'ไม่สามารถดำเนินรายการได้',
          text: "กรุณาเลือกสินค้าลงในตะกร้า!",
          icon: 'warning',
          confirmButtonText: 'ตกลง'
        })
      }
  };

  const toastContent = <div style={{ display: "flex" }}>
  {/* <Lottie style={{ width: "30px", display: "flex", justifyItems: "center" }} animationData={IconWarning} /> */}
  <div className='center'>
      <Ts>กรุณาเลือกสินค้าก่อนยืนยันคำสั่งซื้อ</Ts>
  </div>
</div>;

  return (
    <>

    <HeaderUser />
    <section className="h-100 gradient-custom " >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
 
  <div className="container py-5 ">
  <div className="project-details-wrap">
    <div className="row d-flex justify-content-center my-4 ">
      
      <div className="col-md-8 " >
        <div className="card mb-4">
          <div className="card-header py-3">
          <h5 className="mb-0">ตระกร้า</h5>
          </div>
          {carts?.map((cart)=>{
            return<>
            <div className="card-body" key={cart.id}>
            <div className="row">
              <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                <ColAccount className="">
                <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                  <img src={cart.imageProduct}
                    className="w-100" alt="Blue Jeans Jacket" />
                  <a href="#!">
                    <div className="mask" style={{background: "rgba(251, 251, 251, 0.2)"}}></div>
                  </a>
                </div>
                </ColAccount>
              </div>
              

              <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                {/* <!-- Data --> */}
                <p><strong>{cart.product.name} </strong></p>
                <p>ประเภท: {cart.product.categoryProduct.name}</p>
                {/* <p>จำนวนx{cart.product.stock}: </p> */}

                {/* <button type="button" className="btn btn-primary btn-sm me-1 mb-2 mr-2"  data-mdb-toggle="tooltip"
                  title="Remove item">
                  <i className="fas fa-trash"></i>
                  
                </button>
            
                <button type="button" className="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                  title="Move to the wish list">
                  <i className="fas fa-heart"></i>
                </button> */}
                {/* <!-- Data --> */}
              </div>

              <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                <div className="text-start text-md-center" style={{maxWidth:  "300px"}}>




    
                  
                  {/* <InputNumber value={cart.amountProduct} min={1} max={cart.product.stock} style={{width:"1xp"}}/> */}

                  <InputNumber
                              style={{
                           
                              
                              }}
                              min={1}
                              max={cart.product.stock}
                              value={cart.amountProduct}
                              onChange={(value) => {
                                onChangeNumberCart({ value, data: cart });
                              }}
                            />

                </div>

                <p className="text-start text-md-center">
                  <strong>฿{cart.product.price} บาท</strong>
                </p>
                {/* <!-- Price --> */}
              </div>
            </div>
            
  

            <hr className="my-4" />


          </div>
            </>
          })}
          
        </div>
        <div className="card mb-4">
          <div className="card-body">
            <p><strong>ช่วงเวลาการจัดส่ง</strong></p>
            <p className="mb-0">1/2/2023 - 1/3/2023</p>
          </div>
        </div>
        <div className="card mb-4 mb-lg-0">
          <div className="card-body">
            <p><strong>รองรับการชำระ</strong></p>
            <img className="mr-2  " width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/visa.svg"
              alt="Visa" />
            <img className="mr-2" width="45px"
              src="https://mdbcdn.b-cdn.net/wp-content/plugins/woocommerce-gateway-stripe/assets/images/mastercard.svg"
              alt="Mastercard" />
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h5 className="mb-0">ผลสรุป</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                ราคาสินค้า
                <span>฿{priceTotal}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                ค่าจัดส่ง
                <span>ฟรี</span>
              </li>
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                <div>
                  <strong>ราคารวม</strong>
                  <strong>
                    <p className="mb-0">(รวมภาษีมูลค่าเพิ่ม)</p>
                  </strong>
                </div>
                <span><strong>฿{priceTotal}</strong></span>
              </li>
            </ul>

            <button onClick={()=>
              AddCheckout()
              } type="button" className="btn btn-primary btn-lg btn-block" >
              ยืนยันการชำระ
            </button>
          </div>
               </div>
        </div>
      </div>
    </div>
  </div>
</section>
<FooterUser />
   </>
  )
}

export default Carts