import { Alert, Button, Col, List, Popconfirm, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { Address } from '../../Model/Address';
import { deleteAddressAsync, GetAddressAll } from '../../Stone/addressSilce';
import { useAppDispatch, useAppSelector } from '../../Stone/configureStore';
import { ColAccount } from './ProfileUser';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Container } from 'react-bootstrap';
import { convertToAddress, Ts } from '../../API/util/util';
import useAddress from '../hooks/useAddress';
import ModalFormAddress from './FormAddress/ModalFormAddress';
import useUser from '../hooks/useUser';

function AccountAddress() {
  const {addresses}=useAddress();
  const {localaccount} = useUser();


  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<Address | null>(null);
  const dispatch = useAppDispatch();
  
  const ShowModal = ({ status }: any) => {
    let data = null;
    if (updateData) data = convertToAddress(updateData);
    return <ModalFormAddress modalOpen={status} setModalOpen={setModalOpen} address={ data} />
};




  return (

    <>
    <ShowModal status={modalOpen} />
     <ColAccount className="col-main col-sm-9 ">
                <div className="my-account project-details-wrap">
                    <div className="dashboard">
                        <div className="welcome-msg">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <p className="hello"><strong> ที่อยู่ของฉัน </strong></p>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setUpdateData(null);
                                        setModalOpen(true);
                                    }}
                                    htmlType="button"
                                    icon={<PlusCircleOutlined style={{ fontSize: '110%' }} />}
                                    size="middle"
                                    className='text-st'
                                >
                                    เพิ่มที่อยู่
                                </Button>
                            </div>
                        </div>
                        <Container>
                            <div className="col2-set">
                                <div
                                    id="scrollableDiv"
                                    style={{
                                        height: 400,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    <List
                                        dataSource={addresses}
                                        renderItem={(item, index) => {
                                            
                                            return <List.Item key={index}>
                                            <Space className='text-st' direction="vertical" size={0.1} style={{ width: "100%" }}>
                                                   <Row>
                                                       <Col xs={12} md={8} >
                                                           <div><strong>{item.addressInformation.accountName}</strong> | <span>{item.addressInformation.accountPhoneNumber}</span></div>
                                                           <div>ต.{item.addressInformation.subDistrict} อ.{item.addressInformation.district} จ.{item.addressInformation.province} ({item.addressInformation.zipCode})</div>
                                                           <div>{item.addressInformation.detail}</div>
                                                           {item.statusAddressID === 1 && <Alert
                                                               className='text-st text-center'
                                                            //    type="error"
                                                               message="ค่าเริ่ม"
                                                               style={{
                                                                   width: "80px",
                                                                   height: "30px"
                                                               }}
                                                           />}
                                                       </Col>
                                                       <Col
                                                           xs={6}
                                                           md={4}
                                                           className="flex-end"
                                                       >
                                                           <div style={{
                                                               display: "inline",
                                                           }}>
                                                               <div>
                                                                   <Button onClick={() => {
                                                                       setModalOpen(true);
                                                                        setUpdateData(item);
                                                                   }} className='text-st' type="link">แก้ไข</Button>
                                                                   <Popconfirm
                                                                       title={<Ts>ต้องการลบที่อยู่นี้?</Ts>}
                                                                       okText={<Ts>ตกลง</Ts>}
                                                                       cancelText={<Ts>ยกเลิก</Ts>}
                                                                     onConfirm={() => dispatch(deleteAddressAsync(item.id)).then(()=>{ dispatch(GetAddressAll(localaccount.id))})}
                                                                   >
                                                                       <Button className='text-st' type="link">ลบ</Button>
                                                                   </Popconfirm>
                                                               </div>
                                                               <div>
                                                                   {/* <Button onClick={() => dispatch(updateStatusAddressAsync(item))} disabled={item.status} className='text-st' >ตั้งเป็นค่าตั้งต้น</Button> */}
                                                               </div>
                                                           </div>
                                                       </Col>
                                                   </Row>
                                               </Space>
                                           </List.Item>
                                        }}
                                    />
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </ColAccount>
    </>
  )
}

export default AccountAddress