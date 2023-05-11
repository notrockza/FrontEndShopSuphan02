import {
    Button,
    Input,
    Select,
    Form,
    UploadProps,
    Upload,
    Badge,
    message,
    Row,
    Col,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import SidebarAdmin from "../Sidebar/SidebarAdmin";
  import {
    CloseOutlined,
    CloudUploadOutlined,
    LoadingOutlined,
    RollbackOutlined,
    SaveOutlined,
    DeleteOutlined,
    UploadOutlined 
  } from "@ant-design/icons";
  import { ErrorMessage, Formik } from "formik";
  import { Navigate, useLocation, useNavigate } from "react-router-dom";
  import { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
  import { useAppDispatch, useAppSelector } from "../../../Stone/configureStore";


  import Swal from "sweetalert2";
   import { InformationPrivateValidate } from "./InformationPrivateValidate";
  import agent from "../../../API/Agent";
  import { MailOutlined, InboxOutlined,TagsOutlined ,DollarOutlined,TagOutlined} from "@ant-design/icons";
  import useProduct from "../../hooks/useProduct";
import { GetInformationAll } from "../../../Stone/InformationSlice";
  
  const { Option } = Select;
  
  const { TextArea } = Input;
  function InformationAdminform() {
    const dispatch = useAppDispatch();

    const { state } = useLocation();
    console.log("state",state)
    const RemoveImage = () => setImageUrl("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
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
  
    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => callback(reader.result as string));
      reader.readAsDataURL(img);
    };
  
    const [imageUrl, setImageUrl] = useState<string>();
  
    const values = {
      id: state  ? state.key : '',
      nameinformation: state ? state.nameinformation : "",
      detaiinformation: state ? state.detaiinformation : "",
      formFiles: "",
      
    };
  
  
    const handleSubmitForm = async (value: any) => {
      let result;
      if(!state) result = await agent.Information.create(value)
      else result = await agent.Information.update(value)

      if(result.msg === "OK")
        Swal.fire({
          position: "center",
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate("/admin/Information")).then(()=>dispatch(GetInformationAll()));
        // if(result.msg === "รหัสซ้ำ")
        // Swal.fire({
        //   position: "center",
        //   title: 'เกิดข้อผิดพลาด!',
        //   icon: 'error',
        // })
    };
  
  const beforeUploadAntd = (file: RcFile) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'|| file.type === 'image/jpg';
      if (!isJpgOrPng) {
        message.error('สามารถอัปโหลดไฟล์ JPG/PNG เท่านั้น!');
      }
      const isLt2M = file.size / 1024 / 1024 < 100;
      if (!isLt2M) {
        message.error('รูปภาพต้องมีขนาดเล็กกว่า 100MB!');
      }
      return isJpgOrPng && isLt2M;
    };
  
    return (
      <SidebarAdmin>
        <Formik
          initialValues={values}
          validationSchema={InformationPrivateValidate}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSubmitForm(values);
              console.log('values',values)
              setSubmitting(false);
            }, 400);
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
            setFieldValue,
          }) => {
            const props: UploadProps = {
              name: 'formFiles',
              multiple: false,
              onChange: (info) => {
                if (info.file.status === 'uploading') {
                  setLoading(true);
                  return;
                }
                getBase64(info.file.originFileObj as RcFile, (url) => {
                  setLoading(false);
                  setImageUrl(url);
                });
                setFieldValue("formFiles", info.file.originFileObj);
              }
            };
  
            return (
              <Form onFinish={handleSubmit}>
                <section className=" project-details-wrap ">
                  <div className="contact-wrap pt-10 pb-10">
                    <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-24">
                          <div className="contact-form">
                            <div className="row">
                            
                              <div
                                className="col-md-6"
                                style={{ padding: "7px" }}
                              >
                                <Input
                                  size="large"
                                  name="nameinformation"
                                  type="text"
                                  placeholder="ชื่อหัวข้อประชาสัมพันธ"
                                  status={
                                    touched.nameinformation && errors.nameinformation ? "error" : ""
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.nameinformation}
                                //   prefix={
                                //     <TagOutlined
                                //       style={{
                                //         color: "#8c8c8c",
                                //       }}
                                //     />
                                    
                                //   }
                                  
                                  // <InboxOutlined /> <TagsOutlined />
                                />
                                <ErrorMessage
                                  name="nameinformation"
                                  component="div"
                                  className="text-danger text-st"
                                />
                              </div>
                              <div
                                className="col-md-2"
                                style={{ padding: "7px" }}
                              >
                                
                              </div>
                              <div
                                className="col-md-2"
                                style={{ padding: "7px" }}
                              >
                                
                              </div>
                              <div
                                className="col-md-12"
                                style={{ padding: "7px" }}
                              >
                                <TextArea
                                  showCount
                                  name="detaiinformation"
                                  maxLength={100}
                                  style={{ height: 120, resize: "none" }}
                                  placeholder="รายละเอียด"
                                  status={
                                    touched.detaiinformation && errors.detaiinformation ? "error" : ""
                                  }
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.detaiinformation}
                                  
                                  
                                />
                                <ErrorMessage
                                  name="detaiinformation"
                                  component="div"
                                  className="text-danger text-st"
                                />
                              </div>
  
  
  <Upload.Dragger height={250} {...props} beforeUpload={beforeUploadAntd} showUploadList={false} className="col-md-4 mt-3">
                      {!imageUrl ?
                        !state ? (<> <p className="ant-upload-drag-icon">
                          {!loading ? <UploadOutlined style={{ fontSize: "60px" }} /> : <LoadingOutlined style={{ fontSize: "60px" }} />}
                        </p>
                          <p className="ant-upload-text text-st">
                            เพิ่มรูปภาพ
                          </p> </>)
                          : (<Badge count={<Button
                            type="primary"
                            shape="circle"
                            htmlType='button'
                            danger icon={<CloseOutlined />}
                            onClick={RemoveImage}
                            size="small"
                            style={{ marginLeft: "5px" }} />}>
                            <img
                              src={state.image}
                              className='img-thumbnail'
                              alt='...'
                              style={{ width: '100%', height: "200px" }}
                            />
                          </Badge>) : (<Badge count={<Button
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
                          </Badge>)}
                    </Upload.Dragger>
                             
  
                             
                            </div>
  
                            <div className="mt-5">
  
                            <Row>
                              <Button type="primary" ghost htmlType="submit" loading={isSubmitting}>ตกลง</Button >
                              <Col span={8}  offset={12}/>
                                
                      
                              <Button htmlType="submit" danger onClick={()=>{navigate("/admin/Information")}}>ยกเลิก</Button>
                              </Row>
                              
  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Form>
            );
          }}
        </Formik>
      </SidebarAdmin>
    );
  }
  
  export default InformationAdminform;
  