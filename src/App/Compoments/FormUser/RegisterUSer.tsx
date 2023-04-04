import React, { useEffect, useState } from 'react'
import FooterUser from '../PageUser/FooterUser'
import HeaderUser from '../PageUser/HeaderUser'
import SliderUser from '../Silder/SliderUser'
import { Badge, Button, Input, message, Select, Space } from 'antd';
import { Formik, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Stone/configureStore';
import swal from 'sweetalert';
import { registerAccount, roleAccount } from '../../Stone/accountSlice';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined ,CloudUploadOutlined ,DeleteOutlined} from '@ant-design/icons';
import { RegisterValidate } from './ValidationUser';
import Upload, { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
//import { UploadOutlined } from '@mui/icons-material';
//import { CloseOutlined, UploadOutlined } from "@mui/icons-material";

function RegisterUser() {
    const [imageUrl, setImageUrl] = useState<string>();
    const [loading, setLoading] = useState(false);
    const RemoveImage = () => setImageUrl("");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    const submitForm = async (data: any) => {
        const result = await dispatch(registerAccount(data)).unwrap();
        if (result.msg === "OK") {
            swal({
                title: "เข้าสู่ระบบสำเร็จ",
                icon: "success",
                buttons: [false, "ตกลง"],
            }).then(() => navigate("/login")
            );
        } else {
            swal({
                title: result.msg,
                icon: "warning",
                buttons: [false, "ตกลง"],
            });
        };
    };

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };
    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!");
        }
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!isLt2M) {
            message.error("รูปภาพต้องมีขนาดเล็กกว่า 100MB!");
        }
        return isJpgOrPng && isLt2M;
    };

    const { roles } = useAppSelector(state => state.account);
    useEffect(() => {
        if (!roles) dispatch(roleAccount());
    }, []);
    return (
        <>
        <br /><br /><br /><br /><br /><br /><br />
            <HeaderUser />
            {/* <SliderUser /> */}

            <section className="contact-area project-details-wrap">

                <div className="contact-wrap pt-10 pb-10" >

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-6 col-lg-8">
                                <div className="section-title text-center mb-70">
                                    <h6 className="sub-title">สมัครสมาชิก</h6>
                                    <h2 className="title"><span>สมัคร </span> สมาชิก</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-xl-5 col-lg-12">
                                <div className="contact-form">
                                    <Formik
                                        validationSchema={RegisterValidate}
                                        initialValues={{ name: "", email: "", password: "", tell: "", roleID: "", formflie: File }}
                                        onSubmit={async (values) => {
                                            await new Promise((r) => setTimeout(r, 500));
                                            console.log(values);
                                            submitForm(values)
                                        }}


                                    >
                                        {({
                                            values,
                                            errors,
                                            touched,
                                            handleChange,
                                            handleBlur,
                                            handleSubmit,
                                            isSubmitting,
                                            setFieldValue
                                        }) => {
                                            const handleChangeImaage: UploadProps["onChange"] = (
                                                info: UploadChangeParam<UploadFile>
                                            ) => {
                                                if (info.file.status === "uploading") {
                                                    setLoading(true);
                                                    return;
                                                }
                                                getBase64(info.file.originFileObj as RcFile, (url) => {
                                                    setLoading(false);
                                                    setImageUrl(url);
                                                });
                                                //console.log(info.file.originFileObj)
                                                setFieldValue("formflie", info.file.originFileObj);
                                            };
                                            return (<Form onSubmit={handleSubmit}>

                                                <div className="row" >
                                                    <div className="col-md-6" style={{ padding: "7px" }}>

                                                        <Input size="large"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            status={touched.name && errors.name
                                                                ? "error"
                                                                : ""}
                                                            name="name"
                                                            value={values.name}
                                                            placeholder="ชื่อ*" prefix={<UserOutlined style={{

                                                                color: '#8c8c8c',
                                                            }} />} />
                                                        <ErrorMessage name="name" component="div" className="text-danger" />

                                                    </div>
                                                    <div className="col-md-6" style={{ padding: "7px" }}>
                                                        <Input
                                                            size="large"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            status={touched.email && errors.email
                                                                ? "error"
                                                                : ""}
                                                            name="email"
                                                            value={values.email}
                                                            type="text" placeholder="อีเมล์"
                                                            prefix={<MailOutlined style={{

                                                                color: '#8c8c8c',
                                                            }} />} />
                                                        <ErrorMessage name="email" component="div" className="text-danger" />

                                                    </div>
                                                    <div className="col-md-12" style={{ padding: "7px" }}>
                                                        <Input.Password
                                                            size="large"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            status={touched.password && errors.password
                                                                ? "error"
                                                                : ""}
                                                            name="password"
                                                            value={values.password}
                                                            type="passworld" placeholder="รหัสผ่าน *"
                                                            prefix={<LockOutlined style={{

                                                                color: '#8c8c8c',
                                                            }} />} />
                                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                                    </div>


                                                    <div
                                                        className="col-md-12" style={{ padding: "7px" }}>
                                                        <Input
                                                            size="large"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            status={touched.tell && errors.tell
                                                                ? "error"
                                                                : ""}
                                                            name="tell"
                                                            value={values.tell} type="text" placeholder="เบอร์โทร"
                                                            prefix={<PhoneOutlined style={{

                                                                color: '#8c8c8c',
                                                            }} />}
                                                        />
                                                        <ErrorMessage name="tell" component="div" className="text-danger" />
                                                    </div>

                                                    {/* <Select

                                                        style={{ width: "100%", padding: "7px" }}
                                                        size="large"
                                                        onChange={(data) => {
                                                            setFieldValue("roleID", data.toString());
                                                        }}
                                                        onBlur={handleBlur}
                                                        status={touched.roleID && errors.roleID
                                                            ? "error"
                                                            : ""}
                                                        options={
                                                            roles?.map(data => {
                                                                return {
                                                                    value: data.id,
                                                                    label: data.name,
                                                                    disabled: data.name === "admin" ? true : false,
                                                                }
                                                            })
                                                        }
                                                    /> */}
                                                    <div   style={{ padding: "7px" }}>
                                                    <Upload
                                                        name="avatar"
                                                        className="avatar-uploader"
                                                        showUploadList={false}
                                                        beforeUpload={beforeUpload}
                                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                        onChange={handleChangeImaage}
                                                    >
                                                        <Button loading={loading} icon={<></>} >
                                                            เพิ่มรูปภาพ
                                                        </Button>
                                                    </Upload>
                                                    </div>
                                                    <div  style={{ padding: "7px",margin:"10pX" }} >
                                                        {imageUrl ? (
                                                            <Badge
                                                                count={
                                                                    <Button
                                                                        // type="primary"
                                                                        // shape="circle"
                                                                        htmlType="button"
                                                                        // danger
                                                                        icon={<DeleteOutlined />}
                                                                        onClick={RemoveImage}
                                                                        size="small"
                                                                        style={{ marginLeft: "5px",color: '#8c8c8c', }}
                                                                        
                                                                    />
                                                                }
                                                            >
                                                                <img
                                                                    src={imageUrl}
                                                                    className="img-thumbnail"
                                                                    alt="..."
                                                                    style={{
                                                                        width: "25%",
                                                                        height: "25%",
                                                                        margin: "20px",
                                                                    }}
                                                                />
                                                                
                                                            </Badge>
                                                        ) : (

                                                            <>
                                                                {/* <CloudUploadOutlined 
                                                                className="img-opacity"                                                                 className="img-opacity"
                                                                 style={{ fontSize: "120px" }}/> */}

        
                                                            </>
                                                        )}
                                                    </div>

                                                </div>

                                                <button className="btn gradient-btn">ตกลง</button>
                                                <p className="form-check mb-0 fw-bold mt-2 pt-1 mb-0">คุณต้องการเข้าสู่หน้าล็อกอินหรือไม่? <a href="/login"
                                                    className="link-danger">เข้าสู่ระบบ</a></p>
                                            </Form>
                                            )
                                        }
                                        }



                                    </Formik>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </section>
            {/* <!-- contact-area-end --> */}
            <FooterUser/>
        </>
    )
}

export default RegisterUser