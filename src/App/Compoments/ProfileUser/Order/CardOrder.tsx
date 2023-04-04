// import React, { useState } from 'react';
import { Ts } from "../../../API/util/util";
import {
  Button,
  Card,
  Col,
  Image,
  Row,
  Space,
  Tag,
  Modal,
  Form,
  Divider,
  Upload,
} from "antd";
import { Typography } from "antd";
import { PaperClipOutlined } from "@ant-design/icons";
import { useState } from "react";
import useOrder from "../../hooks/useOrder";
import moment from "moment-timezone";
import useUser from "../../hooks/useUser";
import { ColAccount } from "../ProfileUser";
import ModalTransferPayment from "./ModalTransferPayment";

function CardOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<string>("");
  console.log(id,"id")
  const { orders } = useOrder();
  const { account } = useUser();


  const onClickOpenPaymentForm = (orderId: any) => {
 setOpenModalTransferPayment(true);
 setId(orderId);
};


  const { Title, Text } = Typography;
  const [openModalTransferPayment, setOpenModalTransferPayment] =
    useState<boolean>(false);


  return (
    <>
      {orders?.map((data) => {
        return (
          <div className="">
            <Card>
              <Ts className="card-header">รายการสั่งซื้อ / ชำระเงิน </Ts>
              <div className="card-body">
                <Title level={5}>รหัสรายการสั่ง: {data.id}</Title>

                <Row>
                  <Card>
                    <div className="card-body row">
                      <div className="col">
                        <Title level={5}>
                          วันที่สั่งซื่อ:{" "}
                          <Space>
                            {" "}
                            {moment
                              .utc(data.created)
                              .tz("Asia/Bangkok")
                              .format("YYYY-MM-DD HH:mm:ss")}
                          </Space>{" "}
                        </Title>
                      </div>
                      <div className="col">
                        <Title level={5}>
                          สั่งซื้อโดย:{" "}
                          <Space>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            {account?.name}
                          </Space>{" "}
                        </Title>
                      </div>
                      <div className="col">
                        <Title level={5}>
                          สถานะจัดส่ง: <Space>เลือกโดยผู้จัดส่ง </Space>{" "}
                        </Title>
                      </div>
                      <div className="col">
                        <Title level={5}>ราคารวม : ${data.priceTotal}บาท</Title>
                      </div>
                    </div>
                  </Card>
                </Row>
                <hr />
                <ul className="">
                  {data.orderItems.map((data) => {
                    return (
                      <>
                        <ColAccount>
                          <Card hoverable className="text-st mt-2 ">
                            <Space>
                              <Row>
                                <Col span={3}>
                                  <Image
                                    src={
                                      "https://localhost:7048/images/" +
                                      data.product.image
                                    }
                                    width="100%"
                                  />
                                </Col>

                                <Col span={3}>
                                  <p className="text-start text-md-center">
                                    <strong>{data.product.name} </strong>
                                  </p>
                                  <p className="text-start text-md-center mr-8 ">
                                    <strong> X {data.productAmount} </strong>
                                  </p>
                                </Col>
                              </Row>
                              <Row>
                                <Col span={3}>
                                  <p className="text-start text-md-center mr-4 mb-5">
                                    <strong>฿{data.product.price}</strong>
                                  </p>
                                  {/* <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                                </div> */}
                                </Col>
                              </Row>
                            </Space>
                          </Card>
                        </ColAccount>
                      </>
                    );
                  })}
                </ul>
                <hr />

                <Row justify="start">
                  {data.proofOfPayment === '' ? <> 
                    <Col span={20}>
                    <Button size="large" onClick={()=>{onClickOpenPaymentForm(data.id)}} >
                      {" "}
                      <PaperClipOutlined /> อัพโหลดหลักฐาน{" "}
                    </Button>
                  </Col>
                 
                  </> : <>
                  <Col span={20}>
                    <Tag color="blue" >
                    <Ts >รอการยืนยันการสั่งซื้อ</Ts>

                    </Tag>
                  </Col>
                  </>}
                 

                  <Col span={4}>
                    {" "}
                    <Tag color="orange" >
                      กดทำไมนิ
                    </Tag>
                  </Col>
                </Row>
              </div>
            </Card>
            <ModalTransferPayment
              openModal={openModalTransferPayment}
              setOpenModal={setOpenModalTransferPayment}
              orderId={id}
               setOrderId={setId}
            />
          </div>
        );
      })}     
    </>
  );
}

export default CardOrder;
