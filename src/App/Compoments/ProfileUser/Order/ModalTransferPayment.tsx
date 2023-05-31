import { CloseOutlined, CopyOutlined, LoadingOutlined } from '@ant-design/icons';
import { SetStateAction, useState } from "react";
import { Badge, Button, Col, Divider, message, Modal, Row, Upload, UploadProps } from 'antd'
import { BiCloudUpload } from "react-icons/bi";

// import { CopyToClipboard } from 'react-copy-to-clipboard';
import { RcFile } from 'antd/es/upload';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';



import AppSwal from '../../charts/AppSwal';
import { Ts, beforeUploadAntd, getBase64 } from '../../../API/util/util';
import { useAppDispatch } from '../../../Stone/configureStore';
import { fetchOrderByIdAccountAsync, updateOrderAsync } from '../../../Stone/orderSlice';
import agent from '../../../API/Agent';
import { Paymentstatus } from '../../../Model/Order';
// import AppSwal from '../../../../app/components/AppSwal';

interface Props {
    openModal: boolean;
    setOpenModal: Function;
    orderId: string;
     setOrderId: Function;
}
const accountNumber = "1101310570";
const accountName = "วรวี วรปัญญนันท์";

const ValidateSchema = Yup.object().shape({
    FormFiles: Yup.string().required('กรุณาเลือกไฟล์'),
});
// , setOrderId 
const ModalTransferPayment = ({ openModal, setOpenModal, orderId, setOrderId  }: Props) => {
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const localaccount = JSON.parse(localStorage.getItem("account")!)
    
    const handleSubmitForm = async (value: any) => {
        
        const result =  await agent.Order.update(value)
        console.log("value",value)
        if (result.msg === "OK") {
            AppSwal({
                icon: "success",
                onThen: () => {
                    setOpenModal(false);
                     setOrderId("");
                    setImageUrl("");
                    dispatch(fetchOrderByIdAccountAsync(localaccount.id));
                },
                title: "บันทึกข้อมูลสำเร็จ",
                timer: 1500
            });
        };
    };

    return (
        <Formik
            initialValues={{ ID: "", FormFiles: '' , paymentStatus : Paymentstatus.PendingApproval }}
            validationSchema={ValidateSchema}
            onSubmit={(values, { resetForm }) => {
                values.ID = orderId;
                handleSubmitForm(values);
                resetForm();
                console.log(values,"values")
            }}
        >
            {({
                handleSubmit,
                setFieldValue,
                resetForm
            }) => {
                const props: UploadProps = {
                    name: 'FormFiles',
                    multiple: false,
                    onChange: (info) => {
                        if (info.file.status === 'uploading') {
                            setLoading(true);
                            return;
                        }
                        getBase64(info.file.originFileObj as RcFile, (url: SetStateAction<string>) => {
                            setLoading(false);
                            setImageUrl(url);
                        });
                        setFieldValue("FormFiles", info.file.originFileObj);
                        console.log("orderId",orderId)
                    }
                    
                };

                const RemoveImage = () => {
                    setFieldValue("FormFiles", "");
                    setImageUrl("");
                };

                const onCancel = () => {
                    setOpenModal(false);
                     setOrderId("");
                    RemoveImage();
                    resetForm();
                };

                return <Modal
                    title="โอนชำระ"
                    className='text-st'
                    centered
                    okText={<Ts>ตกลง</Ts>}
                    cancelText={<Ts>ยกเลิก</Ts>}
                    open={openModal}
                    onOk={handleSubmit as any}
                    onCancel={onCancel}
                    width={'70rem'}
                >
                    <Form>
                        <Row gutter={24} >
                            {contextHolder}
                            <Col span={8} style={{ textAlign: "center" }}>
                                <div >
                                    <img width="100%" src='https://drive.google.com/uc?id=1UNGB7PaAo1aXj1ea3TrEqVl90-Vq_B7F' alt='image-bank' />
                                    <h4 className='text-st'>ชื่อบัญชี {accountName}</h4>
                                    <h4 className='text-st'>
                                        เลขที่บัญชี {accountNumber} {" "}
                                        {/* <CopyToClipboard text={accountNumber} onCopy={() => messageApi.open({
                                            type: 'success',
                                            content: 'คัดลอกเรียบร้อย',
                                            className : "text-st"
                                        })}>
                                            <Button type='text' icon={<CopyOutlined />} />
                                        </CopyToClipboard> */}
                                    </h4>
                                </div>
                            </Col>
                            <Col span={1} style={{ textAlign: "center" }}>
                                <Divider type='vertical' style={{ height: "100%" }} />
                            </Col>
                            <Col span={15} className="center">
                                <div>
                                    <Upload.Dragger {...props} beforeUpload={beforeUploadAntd} style={{ width: "30rem" }} showUploadList={false}>
                                        {!imageUrl ? <>
                                            {!loading ? <BiCloudUpload style={{ fontSize: "10rem" }} className='img-opacity' /> : <LoadingOutlined style={{ fontSize: "10rem" }} />}
                                            <p className="ant-upload-text text-st">
                                                เพิ่มหลักฐานการโอนเงิน
                                            </p>
                                        </> : <Badge count={<Button
                                            type="primary"
                                            shape="circle"
                                            htmlType='button'
                                            danger icon={<CloseOutlined />}
                                            onClick={RemoveImage}
                                            size="small"
                                            style={{ marginLeft: "5px" }} />}>
                                            <img
                                                src={imageUrl}
                                                className='img-thumbnail'
                                                alt='...'
                                                style={{ width: '100%', height: "200px" }}
                                            />
                                        </Badge>}
                                    </Upload.Dragger>
                                    <ErrorMessage name="FormFiles" component="div" className="text-danger text-st" />
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            }}
        </Formik>
    )
}

export default ModalTransferPayment