import React, { useEffect, useState } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import useOrder from "../../hooks/useOrder";
import { useAppDispatch } from "../../../Stone/configureStore";
import { OrderConfirmOrder } from "../../../Model/Order";
import agent from "../../../API/Agent";
import { Button, Tag, Image, List } from "antd";
import Swal from "sweetalert2";
import { fetchOrderConfirm, updateConfirmOrders } from "../../../Stone/orderSlice";
import moment from "moment";
import { Ts } from "../../../API/util/util";

function OrderAdmin() {
  const { ordersConfirm } = useOrder();
  const dispatch = useAppDispatch()
  console.log("ordersConfirm",ordersConfirm)
 // const dispatch = useAppDispatch();
  //const [orderCF, setOrderCF] = useState<OrderConfirmOrder[] | null>(null);
 // console.log("orderCF",orderCF)
  // useEffect(() => {
  //   loadOrder();
  // }, []);

  // const loadOrder = async () => {
  //   const { data } = await agent.Order.getConfirm();
  //   setOrderCF(data);
  // };

  const OrderConFirm = ordersConfirm?.map((data) => {
    return (
      <div className="col-lg-4 col-md-6">
        <div className="blog-post-item mb-30">
          <div className="blog-post-thumb position-relative">
            <Image src={data.proofOfPayment} style={{ width: "100%" }} />

            <a href="" className="blog-post-tag">
              <i className="fas fa-tag"></i>รอดำเนินการ
            </a>
          </div>
          <div className="blog-post-content">
            <div className="blog-post-meta">
              <ul>
                <li>
                  <i className="far fa-user"></i>
                  <a href="#">{data.addressID}</a>
                </li>
                <li>
                  <i className="far fa-calendar-alt"></i>
                  {moment
                .utc(data.created)
                .tz("Asia/Bangkok")
                .format("YYYY-MM-DD HH:mm:ss")}
                
                  
                </li>
              </ul>
            </div>
            <Tag color="green">
              
              <Ts href="">ราคารวม ฿{data.priceTotal}</Ts>
            
            </Tag>
            <p>
            
            รหัสรายการสินค้า {data.id}
            </p>
            <Button
              onClick={() => {
                handleSubmit(data.id);
              }}
            >
              ยืนยัน <span></span>
            </Button>
          </div>
        </div>
      </div>
    );
  });

  const handleSubmit = async (value: any) => {
    let result;
    result = await agent.Order.updateConfirmOrder({ ID: value });
    if (result.msg === "OK")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ยืนยันรายการสินค้าสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      })
      .then(() =>{dispatch(fetchOrderConfirm())} );
    else
      Swal.fire({
        position: "center",
        title: "Errorไงจะใครล่ะ!",
        icon: "warning",
      });
  };

  return (
    <SidebarAdmin>
      <section
        className="blog-area blog-bg pt-30 pb-90"
        data-background="./src/assets/img/bg/blog_bg.jpg"
      >
        <div className="container">
          <div className="row justify-content-center">
            {ordersConfirm?.length !== 0 ? (
              <>{OrderConFirm}</>
            ) : (
              <>
                <List style={{height:"100%",margin:"10px"}}/>
                
              </>
            )}
          </div>
        </div>
      </section>
    </SidebarAdmin>
  );
}

export default OrderAdmin;
