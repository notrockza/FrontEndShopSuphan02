import React, { Fragment, useEffect, useState } from "react";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import useOrder from "../../hooks/useOrder";
import { useAppDispatch, useAppSelector } from "../../../Stone/configureStore";
import { Address, OrderConfirmOrder } from "../../../Model/Order";
import agent from "../../../API/Agent";
import { Button, Tag, Image, List, Cascader, Col, Input, Row, Space, Empty } from "antd";
import Swal from "sweetalert2";
import { fetchOrderConfirm, updateConfirmOrders } from "../../../Stone/orderSlice";
import moment from "moment";
import { Ts, convertToAddress } from "../../../API/util/util";
import ModalFormAddress from "../../ProfileUser/FormAddress/ModalFormAddress";
import Modal from "antd/es/modal/Modal";
import { ErrorMessage } from "formik";
import { options } from "fusioncharts";
import AppTextInput from "../Charts/AppTextInput";
import useAddress from "../../hooks/useAddress";
import { GetAddressAll, addressSelectors } from "../../../Stone/addressSilce";

function OrderAdmin() {
  const { ordersConfirm } = useOrder();
  const dispatch = useAppDispatch()
  console.log("ordersConfirm",ordersConfirm)
  
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
                {/* <li>
                  <i className="far fa-user"></i>
                  <a href="#">{data.addressID}</a>
                </li> */}
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
      
          <Row>
          <Col span={18}>
            <Button
              onClick={() => {
                handleSubmit(data.id);
              }}
            >
              ยืนยัน <span></span>
            </Button>
          
            </Col>
         
            <Button
              // onClick={() => {
              //   handleSubmit(data.address.accountID);
              // }}

              onClick={() => {
                showModal(data.address.accountID );
            }}
            >
              ที่อยู่ <span></span>
            </Button>
            </Row>
    
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


 // const [modalOpen, setModalOpen] = useState<boolean>(false);
const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
const [idaddress, setId] = useState<number>(0);
console.log("idaddress",idaddress)
const { addressloaded } = useAppSelector((state) => state.address);
const showModal = (id : number) => {
  setId(id);
  setIsModalOpen(true);
};
const [modalOpen, setModalOpen] = useState<boolean>(false);
const handleOk = () => {
  setIsModalOpen(false);
};

const handleCancel = () => {
  setIsModalOpen(false);
};
const {addresses} = useAddress()

// useEffect(()=>{
//   dispatch(GetAddressAll(idaddress))

// },[dispatch])
//const addresses = useAppSelector(addressSelectors.selectAll);

const address = addresses.find((x) => x.statusAddressID === 1);
const empty = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="ไม่พบที่อยู่" className='text-st' />;

  return (
    <SidebarAdmin>

      <Modal title="ที่อยู่" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  >
      <Fragment>
            {address ? <Space direction='vertical' size="middle" style={{ padding: "10px" }}>
                <div id="billing-progress-opcheckout" className='text-st'>
                    รายละเอียดที่อยู่ test{idaddress}:<dt style={{ display: "inline" }}> {address?.addressInformation.detail}</dt>
                </div>
                <div id="shipping-progress-opcheckout" className='text-st'>
                    จังหวัด : <dt style={{ display: "inline" }}>{address?.addressInformation.province}</dt>
                </div>
                <div id="shipping_method-progress-opcheckout" className='text-st'>
                    อำเภอ : <dt style={{ display: "inline" }}> {address?.addressInformation.district}</dt>
                </div>
                <div id="payment-progress-opcheckout" className='text-st'>
                    ตำบล : <dt style={{ display: "inline" }}> {address?.addressInformation.subDistrict}</dt>
                </div>
                <div id="payment-progress-opcheckout" className='text-st'>
                    รหัสไปรษณีย์ : <dt style={{ display: "inline" }}> {address?.addressInformation.zipCode}</dt>
                </div>
            </Space> : empty}
        </Fragment>
      </Modal>
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
